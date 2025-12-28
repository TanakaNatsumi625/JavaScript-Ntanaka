## tailwind(テールウィンド) CSSとは
- 参考：https://qiita.com/Hirohana/items/2a33c96cbdf494958a2e
- 参考：https://evoworx.dev/blog/what-is-tailwindcss/
- utility classを使ったCSSフレームワーク
- 普通CSSは`.primary-button`のようなクラスを作成し、そのクラスに対して色や大きさなどを定義していく
- しかしtailwind CSSではあらかじめ用意されたユーティリティクラスで色や大きさを変える
    - ユーティティファースト・ユーティリティクラスとは
    - 参考：https://qiita.com/Takazudo/items/5180f5eb6d798a52074f
    - 一つの役割だけを持つ、単機能なCSSのクラスのこと。
    - 例：
        - `.p-4 { padding: 16px; }`⇒余白は16pxという役割だけを持つ
        - `bg-white { background-color: white; }`⇒背景を白にするクラス
    - 利用する際は組み合わせて使う
    - `<button class="px-4 py-2 bg-blue-500 text-white rounded">`
- つまり、<u>**従来のCSSは「ボタンのスタイルはこう！」と定めていたが、ユーティリティクファーストの考え方は「スタイルはこう！使うときに組み合わせる！」と定めて使用する**</u>
- tailwindではあらかじめ用意されたユーティリティクラスを使用してスタイルを作ることができる

### メリット
- クラス名を考えなくて済む
- 事前に用意されているコンポーネントではないので、開発者が自由に組み合わせてスタイルをカスタマイズできる

### デメリット
- tailwind独自で定めたユーティリティクラスがあるので、学習コスト有
- 直接HTMLにスタイルを書くため、一要素に適用させるCSSが増えるとクラスが長くなり、可読性が低下する可能性