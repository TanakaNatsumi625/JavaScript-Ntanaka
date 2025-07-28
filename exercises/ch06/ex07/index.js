//`Object.assign()`の動作確認
let target = { x: 1 }, source = { y: 2, z: 3 };
// `Object.assign()`は、targetにsourceのプロパティをコピーする
Object.assign(target, source);
console.log(target); // { x: 1, y: 2, z: 3 }

// `Object.assign()`と等価のassign()を作成する
//...sourcesはスプレット構文ではなく、残余引数として定義されている
//残余引数とは：関数の引数を配列として受け取るための構文
export function assign(target, ...sources) {
  if (target == null) {
    throw new TypeError("Cannot convert undefined or null to object");
  }
  //targetがプリミティブだったらラップする
  //ラップとは：プリミティブをオブジェクトに変換して、一時的にプロパティ操作を可能にすること
  //例：1⇒[Number: 1]、true⇒[Boolean: true]、"abc"⇒[String: "abc"]
  if (typeof target !== "object") {
    target = Object(target);
  }

  for (const source of sources) {
    if (source == null) continue;

    // Object.assign({}, [a, b]) という呼び出し方のための特別処理
    if (Array.isArray(source)) {
      for (const [index, value] of source.entries()) {
        target[index] = value;
      }
    } else {
      const keys = [
        ...Object.keys(source),//stringキーを取ってくる
        ...Object.getOwnPropertySymbols(source).filter(sym =>
          Object.getOwnPropertyDescriptor(source, sym).enumerable
        ), //列挙可能なプロパティにフィルターして、symbolキーを取ってくる  
      ];
      for (const key of keys) {
        target[key] = source[key];
      }
    }
  }

  return target;
}

//動作確認
const sym1 = Symbol("sym1");
const sym2 = Symbol("sym2");
const objWithSymbolProps = {
  [sym1]: "symbol1",
};
Object.defineProperty(objWithSymbolProps, sym2, {
  enumerable: false,
  value: "symbol2",
});
console.log(Object.assign(1, [{ foo: "foo", bar: "bar" }])); // 1
console.log(assign(1, [{ foo: "foo", bar: "bar" }])); // { x: 1, y: 2, z: 3 }
//console.log(Object.assign(null, [{ foo: "foo", bar: "bar" }]))
console.log(Object.assign({ foo: "foo" }, [objWithSymbolProps]))
console.log(assign({ foo: "foo" }, [objWithSymbolProps])); // { foo: 'foo', [Symbol(sym1)]: 'symbol1' }