## 用語調査
### 標準入力
- プログラムが使うデータを受け取る読み込み元

    →コンピューター上で実行されているプログラムが、特に何も指定されていないときに標準的に利用する入力元
- 例：キーボード、ファイル(から書き込むとか)
- キーボードそのものというより、データの経路を示す(以下標準出力も同様)
    - Unix系OSだと、これらはファイルからデータを流し込む、ファイルにデータを書き込むといったデータの流れとして扱っている
    - キーボードもファイルに含まれる…？のではなく、バイト列としてデータを読み書きorそのどちらかができるものをファイルとして扱うという決めごとがある
### 標準出力
- プログラムが使うデータの出力先
- 例：コンソール、ディスプレイ
### 標準エラー出力
- プログラムが使うデータのうち、エラーの出力先
### リダイレクト
- コマンドの出力先を別の出力先に変更すること
- 例えば、コマンドで'ls'の出力結果をファイルに出力するなどできる
```
# ls：カレントディレクトリのファイル一覧を出力するコマンド
ls > /tmp/file.txt
cat /tmp/file.txt
file1
file2
file3
```
### パイプ
- 一方の出力がそのまま別の入力先に流れるように入力・出力するよう調整する方法を指す

- 参考：https://tech-lab.sios.jp/archives/42701
- 参考：https://qiita.com/angel_p_57/items/03582181e9f7a69f8168

## 実行の予想と結果
- `node cat.mjs`
    - 予想：第二引数が無いので、入力されたものが出力される
    - 結果：標準入力(キーボード)されたものが標準出力(コンソール)に表示された
        ```
        hello //入力してEnter
        hello //出力されたもの
        world //入力してEnter
        world //出力されたもの
        ```
- `echo FOO | node cat.mjs`
    - 予想：`echo FOO`＝指定した文字列を標準出力する→`|`でパイプでcat.mjsに渡しているので、FOOが出力される
    - 結果：予想通り
        ```
        FOO
        ```
- `node cat.mjs > output.txt`
    - 予想：cat.mjsの内容がoutput.txtファイルが作られて入力される(このコマンドだけではコンソール上何も起こらないが、catコマンドで出力したら出てきそう)
    - 結果：予想の()の中は合っていたが、文字化けして出力された
        ```
        縺ゅ≠縺・
        ```
- `node cat.mjs file`
    - 予想：node cat.js foo.txt といった形式ではないので、内容がそのまま出力される
    - 結果：予想通り
        ```
        `こんにちは`
        ```
- `node cat.mjs file > output.txt`
    - 予想：fileに書かれている内容がoutput.txtに書き込まれる
    - 結果：文字化けされて書き込まれている…？
        ```
        ��`
        ```
- `node cat.mjs invalid-file > output.txt`
    - 予想：存在しないファイルの内容を描きこもうとしているのでエラーが出力される(つまり、指定したoutput.txtではなく、標準エラー先(コンソール)に出力される)
    - 結果：コンソールに以下が出力された
        ```
        node:events:496
      throw er; // Unhandled 'error' event
      ^

        Error: ENOENT: no such file or directory, open 'C:\Users\r00000625\myRipository\JavaScript-Ntanaka\exercises\ch16\ex05\invalid-file'
        Emitted 'error' event on ReadStream instance at:
            at emitErrorNT (node:internal/streams/destroy:169:8)
            at emitErrorCloseNT (node:internal/streams/destroy:128:3)
            at process.processTicksAndRejections (node:internal/process/task_queues:82:21) {
        errno: -4058,
        code: 'ENOENT',
        syscall: 'open',
        path: 'C:\\Users\\r00000625\\myRipository\\JavaScript-Ntanaka\\exercises\\ch16\\ex05\\invalid-file'
        }
        ```
- `node cat.mjs invalid-file 2> error.txt`
    - 予想：error.txtにエラー内容が書き込まれる
    - 結果：予想通り`cat error.txt`になった
        ```
        node : Warning: Ignoring extra certs from `C:\Users\r00000625\agent\ZscalerRootCertificate-2048-SHA256.crt`, load failed: error:80000002:system library::No such file or directory
        発生場所 行:1 文字:1
        + node cat.mjs invalid-file 2> error.txt
        + ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            + CategoryInfo          : NotSpecified: (Warning: Ignori...le or directory:String) [], RemoteException
            + FullyQualifiedErrorId : NativeCommandError
        
        node:events:496
            throw er; // Unhandled 'error' event
            ^

        Error: ENOENT: no such file or directory, open 'C:\Users\r00000625\myRipository\JavaScript-Ntanaka\exercises\ch16\ex05\invalid-file'
        Emitted 'error' event on ReadStream instance at:
            at emitErrorNT (node:internal/streams/destroy:169:8)
            at emitErrorCloseNT (node:internal/streams/destroy:128:3)
            at process.processTicksAndRejections (node:internal/process/task_queues:82:21) {
        errno: -4058,
        code: 'ENOENT',
        syscall: 'open',
        path: 'C:\\Users\\r00000625\\myRipository\\JavaScript-Ntanaka\\exercises\\ch16\\ex05\\invalid-file'
        }

        Node.js v20.12.2
        ```