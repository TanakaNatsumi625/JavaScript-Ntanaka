## グローバルオブジェクトを参照する方法
- 参照：https://qiita.com/kohki_takatama/items/5f1c6f75e6bbf6553682
- 参考：https://qiita.com/uhyo/items/f3b6feef9444e86bef94
### ブラウザ内
- `window`を使用する 
    - `window.name`でアクセスできる
    - varで宣言したものはアクセスできるが、constで宣言したものはアクセスできない
    - 関数宣言functionを使用した場合、window.name()でアクセスできる
    - constで宣言した変数・関数もwindow.property = 変数 | 関数と明示すればアクセス可能（推奨はされない）
### node内
- `global` 使用する
- 各ファイルが独自のmoduleスコープを持っている
- 以下のように記述することで、グローバル関数になる
```js
global.sayHello = function(name) {
    console.log(`Hello, ${name}!`);
};
```
## その他共通
- `globalThis`を使用する
- 例
```js
// グローバル変数fooを作成（
foo = 123;
// globalThis.fooが123になっている
console.log(globalThis.foo); // 123
```

## ブラウザ独自のプロパティ・メソッド
- nodeと比較し、以下例を10ほど上げる
- Bufferやrequireはnode固有
- 参考：https://qiita.com/mzmz__02/items/3ed731b9ed9dfb74a971
1. window：ウィンドウオブジェクトそのもの
2. document：ドキュメントの出力、ドキュメント情報の取得・設定
3. navigator：ブラウザや OS の情報
4. screen：スクリーンサイズの取得・設定
5. history：履歴の移動（戻る・進む）、履歴数の取得
6. location：URL情報の取得
7. alert()：アラート表示
8. confirm()：確認ダイアログ表示
9. prompt()：入力ダイアログ表示
10. fetch()：HTTP リクエストを行う API

## グローバルオブジェクトにundefinedが定義による問題
- index.jsで以下の実行結果が得られた
```js
console.log(global.undefined);  //undefinedが出力される
```
- 以前はグローバル変数名だったため書き換えが可能だった
```js
undefined = 123;
console.log(undefined); // 123 になってしまう
```
- よって、未定義の判定ができなくなったり、ライブラリ間で衝突が起きてしまう可能性があった
