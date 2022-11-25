(function() {
  return function(argData, argParams) {
    //argData 数据的副本
    if (argParams.isUser) {
      let index = argData.findIndex((el, index, arr) => {
        if (el.id === argParams.id) {
          return true;
        }
      });
      argData.splice(index, 1);
      return {
        isWrite: true, //是否覆盖数据
        data: argData, //需要存储的新数据
        isDelete: true,
        isUser: true,
        id: argParams.id,
        response: {
          //返回的数据
          code: 200,
          data: {}
        }
      };
    } else {
      //系统文件
      return {
        isUserFolder: argParams.isUserFolder,
        isDelete: true,
        id: argParams.id,
        response: {
          //返回的数据
          code: 200,
          data: {}
        }
      };
    }
  };
})();
