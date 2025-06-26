function exampleFunction() {
  {
    const x = 10;
    console.log("Block 1, x:", x); // 10
  }
  
  {
    const x = 20;
    console.log("Block 2, x:", x); // 20
  }
  
  // このスコープでは x は未定義
  //console.log(x); // エラー: x is not defined
}

//動作確認
exampleFunction();