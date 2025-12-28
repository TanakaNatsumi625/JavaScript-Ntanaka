1. 以下の動作を確認しなさい
    - ブラウザの開発者ツールの「ネットワーク」タブを確認してみよう。リンクをクリックしたときに通信は発生しているだろうか？
        - ページ遷移であるdocumentの再度読み込みは発生しない⇒Localhost:3000との通信は発生しない
        - documentタイプのリクエストは出ない
        - rsc(Rect Server Components)は返ってくる⇒Reactが内部的に読むコンポーネントの結果
    - pushState はいつ実行されているだろうか？
        - LinkをクリックしたときにpushStateが呼ばれている
    - リロード時に画面の表示はどうなるだろうか？
     - fooもbarもそのままそれぞれ画面が表示される
     - PushStateのログは出ない

2. 1 で確認した動作と 15.4-10.12 で確認した動作を比較し、next.js の `Link` でどういった処理が行われているかをまとめなさい。
- 参考：https://nextjsjp.org/docs/app/api-reference/components/link
- 15.4-10.12 では、画面リロードするとサーバー側で見つけることができず、エラーになった
- next.jsの`Link`では、まず遷移先のルートやデータをバックグラウンドでプリfetchして読みこむ
- クリックで遷移し、即描画する
- 遷移したとき、新しいURLをhistoryスタックにプッシュする(pushState)
- よって、next.jsの`Link`では読み込み⇒画面遷移⇒描画⇒URL更新といった複数の処理が行われている


### メモ
- SPAとは
- シングルページアプリケーションの略
- https://qiita.com/shinkai_/items/79e539b614ac52e48ca4