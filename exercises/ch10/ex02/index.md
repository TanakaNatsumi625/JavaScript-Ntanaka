参考：https://zenn.dev/ebi_yu/scraps/db4c7d1f3e883a

- IIFE モジュールパターン
    - 即時実行関数の形で関数を定義することでモジュール化したもの(テキストにあった例)
- AMD(Asynchronous Module Definition)
    - クライエントサイド(ブラウザ側)でモジュール形式が使えるようにした仕様。
    - サーバサイドがConnonJS。ブラウザ側でモジュール形式が使えなかった
- UMD
    - モジュールが、グローバルオブジェクト(IIFE)、CommonJS、AMDどの形式で書かれていても、利用できるようにした形式