//`Object.assign()`の動作確認
let target = {x: 1}, source = {y: 2, z: 3};
// `Object.assign()`は、targetにsourceのプロパティをコピーする
Object.assign(target, source);

// `Object.assign()`と等価のassign()を作成する
export function assign(target, ...sources) {
    if (target == null) {
      target = {};
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
          ...Object.keys(source),
          ...Object.getOwnPropertySymbols(source),
        ];
        for (const key of keys) {
          target[key] = source[key];
        }
      }
    }
  
    return target;
  }
  


function testCase(target, sameTarget, sources) {
    try {
      return {
        target,
        sources,
        result: assign(target, ...sources),
        expected: Object.assign(sameTarget, ...sources),
        exception: null,
      };
    } catch (e) {
      return { target, sources, expected: null, exception: e };
    }
  }
  const sym1 = Symbol("sym1");
const sym2 = Symbol("sym2");

function getterSetterObj(name) {
  const obj = {
    get name() {
      return this._name;
    },
    set name(v) {
      this._name = v;
    },
  };
  return Object.defineProperty(obj, "_name", {
    value: name,
    enumerable: false,
    writable: true,
    configurable: false,
  });
}
const objWithSymbolProps = {
    [sym1]: "symbol1",
  };
  Object.defineProperty(objWithSymbolProps, sym2, {
    enumerable: false,
    value: "symbol2",
  });

//   console.log(testCase({ foo: "foo" }, { foo: "foo" }, []));
//   console.log(testCase({}, {}, [
//     { foo: "foo", bar: "bar" },
//     { fizz: "fizz", buzz: "buzz" },
//   ]));
//   console.log(testCase({ foo: "foo", hello: "world" }, { foo: "foo", hello: "world" }, [
//     { foo: "fooo", bar: "bar" },
//     { foo: "foooo", fizz: "fizz", buzz: "buzz" },
//   ]));
//   console.log(testCase(
//     { parent: { child: { foo: "fooo", bar: "bar" } } },
//     { parent: { child: { foo: "fooo", bar: "bar" } } },
//     [{ parent: { child: { fizz: "fizz", buzz: "buzz" } } }],
//   ));
//   console.log(testCase({ foo: "foo", hello: "world" }, { foo: "foo", hello: "world" }, [
//     123,
//     true,
//     ["aa", "bb", "cc"],
//     null,
//     undefined,
//   ]));
//   console.log(testCase(1, 1, [{ foo: "foo", bar: "bar" }]));

  console.log(assign({}, [
    { foo: "foo", bar: "bar" },
    { fizz: "fizz", buzz: "buzz" },
  ]))
  console.log(Object.assign({}, [
    { foo: "foo", bar: "bar" },
    { fizz: "fizz", buzz: "buzz" },
  ])
  )