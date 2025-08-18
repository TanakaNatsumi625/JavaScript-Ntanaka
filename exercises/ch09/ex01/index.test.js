import { C } from "./index.js"; // ts でも可

test("class puzzle", () => {
  expect(C.method()).toBe(1);//クラスの静的メソッドを呼び出している
  expect(new C().method()).toBe(2);//コンストラクタに引数がないためC()という書き方になる
  expect(C.C.method()).toBe(3);//クラスCの中に定義された静的クラスCの静的メソッドを呼び出している
  expect(new C.C().method()).toBe(4);//クラスCの中に定義された静的クラスCのインスタンスメソッドを呼び出している
  expect(new C().C.method()).toBe(5);//クラスCの中のインスタンスメソッドCの静的メソッドを呼び出している
  expect(new new C().C().method()).toBe(6);//クラスCの中のインスタンスメソッドCのインスタンスメソッドを呼び出している
});
