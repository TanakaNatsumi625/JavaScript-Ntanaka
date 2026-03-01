1. `node path/to/shell.js` と実行してみなさい
- '>'が表示され入力状態になる
    ```
    > cmd /c echo Hello
    Hello
    > cmd /c dir
    ドライブ C のボリューム ラベルがありません。
    ボリューム シリアル番号は 161F-DEE9 です

    C:\Users\r00000625\myRipository\JavaScript-Ntanaka\exercises\ch16\ex13 のディレクトリ

    2026/03/02  00:01    <DIR>          .
    2026/03/01  19:54    <DIR>          ..
    2026/03/02  00:01                 0 hello.txt
    2026/03/01  23:48                97 index.md
    2026/03/01  23:57             5,149 shell.js
                3 個のファイル               5,246 バイト
                2 個のディレクトリ  15,607,160,832 バイトの空き領域
    > cmd /c "echo Hello > hello.txt"
    ``` 

2. 問題: なぜ直接 dir を使わず cmd /c を書いているのだろうか？これらの意味は？
 - 参考：https://wa3.i-3-i.info/word12515.html
 -  cmd：コマンドプロンプトを起動
 - /c：コマンドを実行した後コマンドプロンプトを終了する
 - cmdはcmd.exeという実行ファイルがあるが、dirはない→Node.jsから呼ぶことができない
    - このように、シェル自体に含まれているコマンド(exeなし)コマンドを内部コマンド、独立した実行ファイルがあるコマンドを外部コマンドという
 - よって、Nodeのspawnでは探せない→Error: spawn dir ENOENT
    - spqwnはファイルを探してしまうので、内部コマンドを実行できない