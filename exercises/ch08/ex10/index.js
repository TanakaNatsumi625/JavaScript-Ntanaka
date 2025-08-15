export function addMyCall(f){
    //f.mycallに関数を追加する
    f.myCall = function (thisArg, ...args) {
        // argsは残りの引数を配列で受け取る
        // bindでthisをthisArgに設定し、残りの引数を渡して実行
        return f.bind(thisArg, ...args)(); 
    }
}

//動作確認
const f = function () {
    return this.a;
  };

addMyCall(f);
console.log(f.myCall({ a: 1 })); // 1

const g = function (x) {
    return this.a + x;
}
addMyCall(g);
console.log(g.myCall({ a: 1 }, 2)); // 3

const h = function (x, y, z, u, v) {
    return this.a + x + y + z + u + v;
}
addMyCall(h);
console.log(h.myCall({ a: 1 }, 2, 3, 4, 5, 6)); // 21
