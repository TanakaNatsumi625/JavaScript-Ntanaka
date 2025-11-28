export function makeProxyAndLogs(object) {
    //呼び出し履歴を格納する配列
    const logs = [];

    // Proxy ハンドラを定義する
    const handler = {
        // メソッド呼び出しを捕捉するために get ハンドラを定義する
        //プロパティを読み出すときに呼び出される
        //例：proxy.p→target:object, property:"p", receiver:proxy
        get(target, property, receiver) {
            const origValue = Reflect.get(target, property, receiver);
            //もしプロパティの値が関数（メソッド）ならば、呼び出しをログに記録する関数を返す
            if (typeof origValue === "function") {

                //引数の型チェックを行う関数
                const typeCheck = (args) => {
                    for (let arg of args) {
                        if (typeof arg !== "number") {
                            throw new TypeError("引数はすべて数値でなければなりません");
                        }
                    }
                };

                return function (...args) {
                    typeCheck(args);
                    logs.push({
                        time: Date.now(),
                        method: property.toString(),
                        args
                    });
                    //元のメソッドを呼び出し、その結果を返す
                    //ここでx + yを行う
                    const result = Reflect.apply(origValue, target, args);
                    return result;
                };
            }
            return origValue;
        }
    }
    // Proxy オブジェクトを作成する
    let logProxy = new Proxy(object, handler);
    return [logProxy, logs];
}

// 動作確認
// const a = {
//     p: 1,
//     f: (x, y) => {
//         return x + y;
//     },
// };

// const [proxy, logs] = makeProxyAndLogs(a);

// console.log(logs); // []
// console.log(proxy.p); // 1
// console.log(proxy.f(1, 2)); // 3
// console.log(logs); // [{ name: "f", args: [1, 2], timestamp: ... }]
// console.log(proxy.f(1, "f")); // 3