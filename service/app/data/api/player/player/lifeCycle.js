// external 在不同生命周期以及主程序之间共享参数
(function() {
  return function() {
    const commonList = ["c://sf-mobile-web", "/player", "/movie"];
    let pathList = [...commonList];
    pathList.splice(3, 0, "/system");
    let userPathList = [...commonList];
    userPathList.splice(3, 0, "/user");

    return {
      createFloder: function(createFloder, external) {
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
              //用户上传的则没有后缀，直接放入的则有后缀
              let fileName = decodeURIComponent(command);
              filePath = external.userPath + "/" + fileName;
              if(!file_os.existsSync(filePath)){
                
                let index = fileName.lastIndexOf(".");
                fileName = fileName.substring(0, index);
                filePath = external.userPath + "/" + fileName;
              }
              //到用户上传的文件夹下找
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
        return this.getDownloadFilePath(external, result);
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
    };
  };
})();
