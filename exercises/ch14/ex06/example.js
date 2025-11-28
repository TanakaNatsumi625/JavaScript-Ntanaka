/*
* o をラップするProxy オブジェクトを返す。すべての処理をログに
* 記録した後に、そのオブジェクトにすべての処理を委譲する。
* objname は、オブジェクトを識別するためにログメッセージ中に
* 表示される文字列。o の独自プロパティのうち、値がオブジェクトや
* 関数のものについては、このプロパティの値を読みだしたときに
* loggingProxy が返される。このようにプロキシのロギング機能は
* 「伝染性」を持つ。
*/
function loggingProxy(o, objname) {
// ログを記録するProxy オブジェクト用にハンドラを定義する。
// 各ハンドラはメッセージを記録した後、ターゲットオブジェクトに委譲する。
const handlers = {
// このハンドラは、値としてオブジェクトまたは関数を
// 持つ独自プロパティの場合には、特別な処理を行い、
// 値そのものではなくプロキシを返す。
get(target, property, receiver) {
// get 操作をログに記録する。
console.log(`Handler get(${objname},${property.toString()})`);
// Reflect API を使ってプロパティの値を取得する。
let value = Reflect.get(target, property, receiver);
// プロパティがターゲットの独自プロパティで、値がオブジェクトまたは
// 関数の場合は、プロパティ用のProxy を返す。
if (Reflect.ownKeys(target).includes(property) &&
(typeof value === "object" || typeof value === "function")) {
return loggingProxy(value, `${objname}.${property.toString()}`);
}
// それ以外の場合は、値をそのまま返す。
return value;
},
// 以下の3 つのメソッドについては何も特別な点はない。
// 処理をログに記録した後、ターゲットオブジェクトに処理を委譲する。
// これらは特殊なケースであり、無限再帰の原因となりうる
// receiver オブジェクトをログに記録することを避けるため。
set(target, prop, value, receiver) {
console.log(`Handler set(${objname},${prop.toString()},${value})`);
return Reflect.set(target, prop, value, receiver);
},
apply(target, receiver, args) {
console.log(`Handler ${objname}(${args})`);
return Reflect.apply(target, receiver, args);
},
construct(target, args, receiver) {
console.log(`Handler ${objname}(${args})`);
return Reflect.construct(target, args, receiver);
}
};
// 残りのハンドラは自動的に生成できる。
// メタプログラミング最高！
Reflect.ownKeys(Reflect).forEach(handlerName => {
if (!(handlerName in handlers)) {
handlers[handlerName] = function(target, ...args) {
// 操作をログに記録する。
console.log(`Handler ${handlerName}(${objname},${args})`);
// 操作を委譲する。
return Reflect[handlerName](target, ...args);
};
}
});
// これらのログ記録用のハンドラを使って、このオブジェクト用のプロキシを返す。
return new Proxy(o, handlers);
}

// データの配列と、関数プロパティを持つオブジェクトを定義する。
let data = [10,20];
let methods = { square: x => x*x };

// 先ほどの配列とオブジェクト用にログを記録するプロキシを作成する。
let proxyData = loggingProxy(data, "data");
let proxyMethods = loggingProxy(methods, "methods");

// プロキシを使っていろいろな操作を行う。
console.log(data.map(methods.square)); // 元の配列とオブジェクトを使う。
console.log("-------------")
console.log(proxyData.map(proxyMethods.square)); // プロキシを使う。
console.log("-------------")
console.log(data.map(proxyMethods.square)); // 配列は元のもの、オブジェクトはプロキシを使う。
//以下解説
//1.Handler get(data,map)
//配列 data から map メソッドを取得する操作 → Proxy ハンドラ get(target, "map", receiver)
//2.Handler get(methods,square)
//map に渡した引数 proxyMethods.square を評価するときに呼ばれる
//proxyMethods の Proxy を通して square プロパティを取得 → get ハンドラ呼ばれる
// この時点でまだ関数は呼ばれていない → 「取得だけ」
//3.Handler apply(methods.square,undefined,10,20)
//map メソッドが proxyMethods.square を呼び出すときに apply ハンドラが呼ばれる
// 引数は (element, index, array) → (10, 0, [10,20])
// ここで実際に関数 square が呼ばれる
//4.Handler apply(methods.square,undefined,10)
//apply ハンドラ内で Reflect.apply を使って実際に関数を呼び出すときに、再度 apply ハンドラが呼ばれる
//5.Handler apply(methods.square,undefined,20)
//同上、2 回目の引数 20 についても同様