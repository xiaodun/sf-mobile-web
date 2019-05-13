// external 在不同生命周期以及主程序之间共享参数
(function() {
  return function() {
    return {
      createFloder: function(createFloder, external) {
        let pathList = ["c://sf-mobile-web", "/player", "/system", "/movie"];
        let userPathList = ["c://sf-mobile-web", "/player", "/user", "/movie"];
        createFloder(pathList);
        createFloder(userPathList);
        external.systemPath = pathList.join("");
        external.userPath = userPathList.join("");
      },
      dealCommand(command, external) {
        let { userPath, systemPath } = external;
        if (command === "get") {
          let moveList = [];
          //读取文件夹下的视频
          let userFiles = file_os.readdirSync(userPath);
          userFiles.forEach(filename => {
            let filedir = userPath + "/" + filename;
            if (file_os.existsSync(filedir)) {
              //防止读取到删除的文件导致报错
              let stats = file_os.statSync(filedir);
              if (stats.isFile()) {
                moveList.push({
                  name: filename
                });
              }
            }
          });

          let files = file_os.readdirSync(systemPath);

          files.forEach(filename => {
            let filedir = systemPath + "/" + filename;
            let stats = file_os.statSync(filedir);
            if (stats.isFile()) {
              moveList.push({
                name: filename,
                id: filename
              });
            }
          });

          external.moveList = moveList;
        } else {
          //因为无法预知视频的名字  所以这里无法加入详细的判断
          if (command.includes(".")) {
            //获取视频
            //先去系统文件夹下找
            var filePath =
              external.systemPath + "/" + decodeURIComponent(command);
            if (!file_os.existsSync(filePath)) {
              //去掉后缀
              let fileName = decodeURIComponent(command);
              let index = fileName.lastIndexOf(".");
              fileName = fileName.substring(0, index);
              //到用户上传的文件夹下找
              filePath = external.userPath + "/" + fileName;
            }
            console.log(filePath);
            return {
              type: "video",
              filePath
            };
          }
        }
      },
      getUploadPath(external) {
        return external.userPath;
      },
      getDeleteFilePath(external, result) {
        return external.userPath + "/" + result.id;
      },
      getDownloadFilePath(external, result) {
        let path = "";
        if (result.isUser === true) {
          //用户上传
          path = external.userPath + "/" + result.id;
        } else {
          //系统
          path = external.systemPath + "/" + result.id;
        }
        return path;
      },
      start: function() {
        let external = {};
        let pathList = ["c://sf-mobile-web", "/player", "/system", "/movie"];
        let userPathList = ["c://sf-mobile-web", "/player", "/user", "/movie"];
        if (appName === "player" && dataName === "player") {
          let path = pathList.join("");
          let userPath = userPathList.join("");
          external.rootPath = path;
          if (command === "get") {
            //创建目录
            let moveList = [];
            createFloder(pathList);
            createFloder(userPathList);
            //读取文件夹下的视频
            let userFiles = file_os.readdirSync(userPath);
            userFiles.forEach(filename => {
              let filedir = userPath + "/" + filename;
              if (file_os.existsSync(filedir)) {
                //防止读取到删除的文件导致报错
                let stats = file_os.statSync(filedir);
                if (stats.isFile()) {
                  moveList.push({
                    name: filename
                  });
                }
              }
            });

            let files = file_os.readdirSync(path);

            files.forEach(filename => {
              let filedir = path + "/" + filename;
              let stats = file_os.statSync(filedir);
              if (stats.isFile()) {
                moveList.push({
                  name: filename,
                  id: filename
                });
              }
            });

            external.moveList = moveList;
          } else {
            //因为无法预知视频的名字  所以这里无法加入详细的判断
            //获取视频
            if (command.includes(".")) {
              //先去系统文件下找
              var filePath =
                external.systemPath + "/" + decodeURIComponent(command);
              if (!file_os.existsSync(filePath)) {
                //去掉后缀
                let fileName = decodeURIComponent(command);
                let index = fileName.lastIndexOf(".");
                fileName = fileName.substring(0, index);
                //到用户上传的文件夹下找
                filePath = external.userPath + "/" + fileName;
              }
              console.log(filePath);
              file_os.stat(filePath, function(error, stats) {
                if (error) {
                  response.end(error);
                }
                var range = request.headers.range;
                if (!range) {
                  // 416 Wrong range
                  return response.sendStatus(416);
                }
                var positions = range.replace(/bytes=/, "").split("-");
                var start = parseInt(positions[0], 10);
                var total = stats.size;
                var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
                var chunksize = end - start + 1;

                response.writeHead(206, {
                  "Content-Range": "bytes " + start + "-" + end + "/" + total,
                  "Accept-Ranges": "bytes",
                  "Content-Length": chunksize
                });

                var stream = file_os
                  .createReadStream(filePath, { start: start, end: end })
                  .on("open", function() {
                    stream.pipe(response);
                  })
                  .on("error", function(err) {
                    response.end(err);
                  });
              });
              return;
            }
          }
        }
      }
    };
  };
})();
