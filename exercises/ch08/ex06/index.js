//引数を残余パラメーターに修正した。
const m = function (...arg) {
    console.log(arg[1]);
  };
  //複数パラメーターなので残余パラメーターとして受け取る必要がある
  m("a", "b");//結果：b

//アロー関数に書き直す
const mArrow = (...arg) => {
    console.log(arg[1]);
  };
  mArrow("a", "b");//結果：b