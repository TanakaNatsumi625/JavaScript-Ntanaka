Node で debugger 文を使ってデバッグする方法を調べなさい。

参考：https://nodejs.org/docs/latest/api/debugger.html
https://www.sejuku.net/blog/87186

1. デバッグしたいコードの最初にdebuggerを書く
2. 以下のコマンドで実行する
```
node inspect ファイル名.js
```
3. 以下のmessageが出てくるのでデバッグを進める
デバッグセッション起動
```
< Debugger listening on ws://127.0.0.1:9229/621111f9-ffcb-4e82-b718-48a145fa5db8
< For help, see: https://nodejs.org/en/docs/inspector
<
connecting to 127.0.0.1:9229 ... ok
< Debugger attached.
<
 ok
Break on start in myscript.js:2
  1 // myscript.js
> 2 global.x = 5;
  3 setTimeout(() => {
  4   debugger;
  debug> コマンドを入力する
```
cont, c: 実行を続行
next、n：次のステップ
step、s：ステップイン
out、o：ステップアウト
pause: 実行中のコードを一時停止します（開発者ツールの一時停止ボタンと同様）


- そもそもinspectコマンドがプログラムの流れを把握したり、検査を行うことができるかコマンド
- nキーを押すことで1ステップずつプログラムが進む。これにより、このプログラムがどのような流れで処理されているのか把握できる
- debuggerはブレークポイント。つまり任意の箇所でプログラムをストップして状態を確認できる
- なので長いソースコードの場合、debuggerを点在させておくことで、cコマンドで飛ばしてデバックをすることができる
- デバックセッションを開始した状態で、consoleにフォーカスが当たった状態でreplを打つと、その値を確認することができる
- 例：以下のようなコードがあったとする
```js
const user = {
    name: 'taro',
    age: 30,
    area: 'Tokyo'
  }
  
  console.log(user);
```
- nコマンドでconsole.logにフォーカスが当たった状態でreplを打つと、debug>という表記から > だけの表記に変わる(replモード)
- 例えば、user.nameと入力すると、コード内で定義したuser.nameが出力される
- つまり実際にどう出力されるかを直接確かめることができる
- Ctrl+Cでデバックモードに戻る