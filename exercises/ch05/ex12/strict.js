//strict モードで実行される。

// strict モードでは、変数は宣言されていないとエラーになる。
x = 10;

function f() {
//関数スコープ内では宣言されていないため、エラーになる
  console.log(x); //ReferenceError: x is not defined
}

f();