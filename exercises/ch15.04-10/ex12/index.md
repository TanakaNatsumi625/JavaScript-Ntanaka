## Active や Completed を選択後にブラウザのリロードを行うとどうなるだろうか。hashchange と pushState それぞれの実装について調べなさい(ヒント: 開発者ツールでどのような通信が発生しているか調べてみなさい)。
### 結果
#### hashchange
- `http://127.0.0.1:5500/exercises/ch15.04-10/ex11/#/completed`のURLのままタスクが初期化される
- アプリの状態がJavaScriptのメモリ上の状態からは消える
- hashchangeイベントはリロード時には発火しないからである
#### pushState
- Cannot GET /ch15.04-10/ex12/activeがページに出る
    - コンソールログには以下のように出力される
```
//以下の用なURLは存在しないというエラーが出る
GET http://127.0.0.1:5500/ch15.04-10/ex12/active 404 (Not Found)
```
- pushStateはURLを変えて履歴に保存されるが、サーバー側にURLが保存されるわけではない
    - hashはなぜ404ではない？
    - #/はURLに含まれずにサーバーへ送信される
    - サーバーが返すindex.htmlを見てJSが表示を切り替えるから
- よって、リロードをすると404エラーが出る
- 関連キーワード：dynamic import
- 参考：https://qiita.com/y-hira18/items/0ac10ee4f5d5b8cee410?utm_source=chatgpt.com
## ここまでの例は [serve](https://www.npmjs.com/package/serve) コマンドで HTML や JS といったファイル配信するサーバーを立ち上げてきた。サーバー側がどのような挙動をすれば pushState を使った実装が期待通り動作するか考えて答えなさい。
- URLはクライアント側で解釈する。サーバーはURLのパスに対して画面を切り替えない
- どのURLに対しても同一のindex.htmlを返すべき
- これにより、ページのリロードや直接アクセス時でもクライアント側の解釈が正しく動作する