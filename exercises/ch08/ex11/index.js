//全問の関数をtoString()メソッドを使ってみる

export function addMyCall(f){
    //f.mycallに関数を追加する
    f.myCall = function (thisArg, ...args) {
        // argsは残りの引数を配列で受け取る
        // bindでthisをthisArgに設定し、残りの引数を渡して実行
        return f.bind(thisArg, ...args)(); 
    }
}

console.log(addMyCall.toString()); // 関数の定義を表示

//組み込み関数
console.log(Array.prototype.toString.toString()); // Array.prototype.toStringの定義を表示
console.log(Math.max.toString()); // Math.maxの定義を表示