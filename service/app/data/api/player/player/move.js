(function() {
  return function(argData, argParams, external) {
    var fs = require("fs");
    var path = require("path");

    var sourceFile = path.join(external.userPath, argParams.name);
    var destPath = path.join(external.systemPath, argParams.name);
    var readStream = fs.createReadStream(sourceFile);
    var writeStream = fs.createWriteStream(destPath);
    readStream.pipe(writeStream);
    readStream.on("end", function() {
      fs.unlinkSync(sourceFile);
      external.response.end(
        JSON.stringify({
          success: true
        })
      );
    });
    return {
      async: true,
      response: {
        code: 200,
        data: {}
      }
    };
  };
})();
