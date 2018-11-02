/*  
 自定义前缀/应用名/数据名/命令
 程序会建立 自定义前缀/应用名/数据名 的文件夹结构 然后为每一个命令生成一个js文件
 支持get和put方式
*/
var path_os = require ('path');
var http_os = require ('http');
var file_os = require ('fs');
var url_os = require ('url');
var formidable_os = require ('formidable');
let config = JSON.parse (file_os.readFileSync ('config.json', 'utf-8'));
var server = http_os.createServer (function (request, response) {
  //解析url
  try {
    var urlElementsArr = request.url.slice (1, request.url.length).split ('/');
    console.log (request.url);
    let prefix = urlElementsArr[0],
      appName = urlElementsArr[1],
      dataName = urlElementsArr[2],
      command;
    let paramsPos = urlElementsArr[3].indexOf ('?');
    if (paramsPos == -1) {
      command = urlElementsArr[3];
    } else {
      command = urlElementsArr[3].slice (0, paramsPos);
    }

    //对播放器应用的额外处理
    let external = {};
    if (dataName === 'player') {
      let pathList = ['c://sf-mobile-web', '/player', '/system', '/movie'];
      let path = pathList.join ('');
      external.rootPath = path;
      if (command === 'get') {
        //创建目录
        let moveList = [];
        createFloder (pathList);
        //读取文件夹下的视频
        let files = file_os.readdirSync (path);

        files.forEach (filename => {
          let filedir = path + '/' + filename;
          let stats = file_os.statSync (filedir);
          if (stats.isFile ()) {
            moveList.push ({
              name: filename,
              id: filename,
            });
          }
        });

        external.moveList = moveList;
      } else {
        //获取视频
        if (command.includes ('.')) {
          var filePath = path + '/' + decodeURIComponent (command);

          file_os.stat (filePath, function (error, stats) {
            if (error) {
              if (error.code === 'ENOENT') {
                // 404 Error if file not found
                return response.sendStatus (404);
              }
              response.end (error);
            }
            var range = request.headers.range;
            if (!range) {
              // 416 Wrong range
              return response.sendStatus (416);
            }
            var positions = range.replace (/bytes=/, '').split ('-');
            var start = parseInt (positions[0], 10);
            var total = stats.size;
            var end = positions[1] ? parseInt (positions[1], 10) : total - 1;
            var chunksize = end - start + 1;

            response.writeHead (206, {
              'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
              'Accept-Ranges': 'bytes',
              'Content-Length': chunksize,
              'Content-Type': 'video/mp4',
            });

            var stream = file_os
              .createReadStream (filePath, {start: start, end: end})
              .on ('open', function () {
                stream.pipe (response);
              })
              .on ('error', function (err) {
                response.end (err);
              });
          });
          return;
        }
      }
    }

    //创建结构
    let floderPathArr = (config.abspath
      ? config.abspath.split ('/')
      : []).concat ([config.dataFloderName, prefix, appName, dataName]);
    var rootFloder = {
      path: (config.abspath ? config.abspath + '/' : '') +
        [config.dataFloderName, prefix, appName, dataName].join ('/'),
    };

    let countPath = '';
    floderPathArr.forEach (el => {
      countPath += el + '/';
      if (!file_os.existsSync (countPath)) {
        file_os.mkdirSync (countPath);
      }
    });
    //创建文件
    rootFloder.dataPath = rootFloder.path + '/' + dataName + '.json';

    if (!file_os.existsSync (rootFloder.dataPath)) {
      file_os.writeFileSync (rootFloder.dataPath, '');
    }
    rootFloder.commandPath = rootFloder.path + '/' + command + '.js';
    var commandTemplate = `(function(){
    return function(argData,argParams){
        //argData 数据的副本
        return {

            isWrite:false,//是否覆盖数据
            //data:argData,//需要存储的新数据
            response:{//返回的数据
                code:200,
                data:{
    
                }
            }
        }
    }
})()`;
    if (!file_os.existsSync (rootFloder.commandPath)) {
      file_os.writeFileSync (rootFloder.commandPath, commandTemplate);
    }

    //解析参数

    if (request.method.toUpperCase () == 'POST') {
      /**
         * 文件上传
         */

      if (
        ~(request.headers['content-type'] || '').indexOf ('multipart/form-data')
      ) {
        var postData = {
          files: [],
        };
        var form = new formidable_os.IncomingForm ();
        form.maxFileSize = 5 * 1024 * 1024 * 1024;
        form.uploadDir = __dirname + '/' + rootFloder.path;
        form.parse (request, function (error, fileds, files) {
          if (error) {
            // 超过指定大小时的报错
          }
        });
        form.on ('file', function (name, file) {
          //写入文件名和路径
          postData.files.push ({
            name: file.name,
            type: file.type,
            flag: file.path.substr (file.path.lastIndexOf ('\\') + 1),
          });
        });
        form.on ('end', function () {
          executeCommand (postData);
        });
      } else {
        /**
             * 这个是如果数据读取完毕就会执行的监听方法
             */
        var postData = '';

        request.addListener ('data', function (data) {
          postData += data;
        });
        request.addListener ('end', function () {
          executeCommand (JSON.parse (postData || null));
        });
      }
    } else if (request.method.toUpperCase () == 'GET') {
      var params = url_os.parse (request.url, true).query;
      executeCommand (params);
    }
    function createFloder (list) {
      try {
        let path = '';
        list.forEach (el => {
          path += el;
          if (!file_os.existsSync (path)) {
            file_os.mkdirSync (path);
          }
        });
      } catch (error) {
        response.end (error.stack);
      }
    }
    function executeCommand (params) {
      try {
        //执行命令
        //获取json数据
        var data = JSON.parse (
          file_os.readFileSync (rootFloder.dataPath, 'utf-8') || null
        );
        var cloneData = JSON.parse (JSON.stringify (data));
        // var result = eval(new String(file_os.readFileSync(rootFloder.commandPath)))(cloneData,params);
        var result = eval (
          file_os.readFileSync (rootFloder.commandPath, 'utf-8')
        ) (cloneData, params, external);

        if (result.isDelete) {
          let path = rootFloder.path + '/' + result.file.flag;
          file_os.unlinkSync (path);
        }

        if (result.isWrite) {
          if (result.data) {
            //防止防止数据遭到意外覆盖  比如忘记返回数据！
            file_os.writeFileSync (
              rootFloder.dataPath,
              JSON.stringify (result.data, null, 4)
            );
          } else {
            response.writeHead (500, {
              'Content-Type': 'application/json',
            });
            response.end (JSON.stringify ({message: '重写数据时发生错误,没有得到有效的返回数据'}));
            return;
          }
        }

        if (result.isDownload) {
          // 文件下载;
          let path = rootFloder.path + '/' + result.file.flag;

          let readStream = file_os.ReadStream (path);
          response.writeHead (200, {
            'Content-Type': 'application/octet-stream',
            'Accept-Ranges': 'bytes',
          });
          readStream.on ('close', function () {
            response.end ();
          });
          readStream.pipe (response);

          // let file = file_os.createReadStream (path);
          // response.writeHead (200, {
          //   'Content-Type': 'application/octet-stream',
          //   'Content-Disposition': `attachment; filename=` +
          //     encodeURIComponent (result.file.name),
          // });
          // file.pipe (response);
        } else if (result.isPlayer) {
          //播放文件
          if (dataName === 'player') {
            let path = external.rootPath + '/' + result.file.name;
            let readStream = file_os.ReadStream (path);
            response.writeHead (200, {
              'Content-Type': 'application/octet-stream',
              'Accept-Ranges': 'bytes',
            });
            readStream.on ('close', function () {
              response.end ();
            });
            readStream.pipe (response);
          }
        } else {
          //返回结果
          response.writeHead (result.response.code, {
            'Content-Type': 'application/json',
          });
          response.end (JSON.stringify (result.response.data));
        }
      } catch (error) {
        console.log (error);
        response.end (error.stack);
      }
    }
  } catch (error) {
    console.log (error);
    response.end (error.stack);
  }
});
server.setTimeout (0);
server.listen (config.port);
console.log ('service is running');