(function () {
  return function (argData, argParams, external) {
    //argData 数据的副本
    argData = argData || [];
    external &&
      external.moveList instanceof Array &&
      external.moveList.forEach ((el, index, arr) => {
        let move = {...el};
        el.isSystem = true;
        argData.push (move);
      });
    return {
      isWrite: false, //是否覆盖数据
      //data:argData,//需要存储的新数据
      response: {
        //返回的数据
        code: 200,
        data: argData,
      },
    };
  };
}) ();
