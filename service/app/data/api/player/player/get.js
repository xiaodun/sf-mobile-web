(function () {
  return function (argData, argParams, external) {
    //argData 数据的副本
    let data = [];
    argData = argData || [];
    external &&
      external.moveList instanceof Array &&
      external.moveList.forEach ((el, index, arr) => {
        argData.some ((el1, index1, arr1) => {
          if (el1.flag == el.name) {
            el.id = el1.flag;
            el.flag = el1.flag;
            el.isUser = true;
            el.name = el1.name;
          }
        });

        data.push (el);
      });

    return {
      isWrite: false, //是否覆盖数据
      //data:argData,//需要存储的新数据
      response: {
        //返回的数据
        code: 200,
        data,
      },
    };
  };
}) ();
