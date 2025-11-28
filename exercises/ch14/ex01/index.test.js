import {
  nestedUnwritableObj,
  unwritableAndUnconfigurableObj,
  writableAndUnconfigurableObj,
} from "./index.js";

//unwritableAndUnconfigurableObj()は以下のオブジェクトを返す
//{ a:1}
//プロパティaは書き換え不可、削除不可
test("Unwritable and unconfigurable object", () => {
  const a = unwritableAndUnconfigurableObj();
  expect(a).toStrictEqual({ a: 1 });
  expect(() => (a.a = 3)).toThrow();
  expect(() => delete a.a).toThrow();
});

//writableAndUnconfigurableObj()は以下のオブジェクトを返す
//{ b:2}
//プロパティbは書き換え可能、削除不可
test("Writable and unconfigurable object", () => {
  const b = writableAndUnconfigurableObj();
  expect(b).toStrictEqual({ b: 2 });
  b.b = 3;
  expect(b.b).toBe(3);
  expect(() => delete b.b).toThrow();
});

//nestedUnwritableObj()は以下のオブジェクトを返す
//{ c: { d: { e: 3 } } }
//ネストされたすべてのオブジェクトが書き込み不可（writable: false）かつ拡張不可（extensible: false）
test("Nested unwritable object", () => {
  const c = nestedUnwritableObj();
  expect(c).toStrictEqual({ c: { d: { e: 3 } } });
  expect(() => (c.f = 1)).toThrow();
  expect(() => (c.c.f = 1)).toThrow();
  expect(() => (c.c.d.f = 1)).toThrow();
  expect(() => (c.c.d.e.f = 1)).toThrow();
});
