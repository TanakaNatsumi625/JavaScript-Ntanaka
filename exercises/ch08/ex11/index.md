### 組み込み関数と自作関数の `toString()` の出力内容を確認しなさい
## 組み込み関数
- 実装内容
```js
console.log(Array.prototype.toString.toString()); // Array.prototype.toStringの定義を表示
console.log(Math.max.toString()); // Math.maxの定義を表示
```
- 実行結果
```
function toString() { [native code] }
function max() { [native code] }
```
- メモ：自作関数か組み込み関数を見分けるのに使えそう
## 自作関数
- 実装内容
- 問題10で実装した内容を出力した
```js
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
```
- 実行結果
```
function addMyCall(f){
    //f.mycallに関数を追加する
    f.myCall = function (thisArg, ...args) {
        // argsは残りの引数を配列で受け取る
        // bindでthisをthisArgに設定し、残りの引数を渡して実行
        return f.bind(thisArg, ...args)();
    }
}
```