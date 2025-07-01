//非strict モードで実行される。

// 非strict モードでは、変数は宣言されていないと、グローバル変数として扱われる。
x = 10;

function f() {
  console.log(x); // 10
}

f();