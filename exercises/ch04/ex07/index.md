`set42`に以下の引数を与えた場合、プログラムが終了してしまう
```js
set42("globalThis.process.exit()");
// => globalThis.process.exit() = 42;
// globalThis.process.exit()はnode.jsのプロセスを終了する関数
```
メモ：eval()は与えられた文字列を評価して実行できてしまうので、特に外部からの入力を受け取るところに使ってはいけない