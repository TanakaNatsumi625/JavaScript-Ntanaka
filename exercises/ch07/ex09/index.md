## `"𠮷野家"[0]`や `"👨‍👨‍👧‍👧"[0]` が何を返す調べる
- 出力結果
```js
console.log("𠮷野家"[0]); // �(文字化け)
console.log("👨‍👨‍👧‍👧"[0]); //�(文字化け)
console.log("test"[0]); //t
```
- 理由
    - 文字が二つ以上のコード単位で出来ているから(サロゲートペア)
    - str[0] は「UTF-16の1コード単位（16ビット）」しか取り出せない⇒サロゲートペアの片割れだけでは表示できない
    - 文字のlengthを見たほうがわかりやすい
    ```js
    const str = "𠮷";
    console.log(str.length); // 2
    console.log(str[0]);     // '\uD842' → 単独では表示できないので "�"
    console.log(str[1]);     // '\uDFB7'
    ```

## 課題8で調べた絵文字に対する知見
- 例えば'.split('')を使うとき、UTF-16のコード単位で分割してしまう(絵文字とか日本語とか)
- そのため、Unicodeの文字を正しく扱うためには、Intl.Segmenterを使ってグラフェム単位で分割する必要がある
- グラムフェム：人間の目に見える一文字分
しかし絵文字などは一文字に見えてもUnicodeでは複数のコードポイントで構成されていることがある(lengthするとわかる)
```js
const s = "é"; // 見た目は e + アクセント記号

console.log(s);                 // é（見た目は1文字）
console.log(s.length);          // 2（実体は2個）
console.log(s.split(''));       // ["e", "́"]（分かれる）
```

よってIntl.Segmenterを使うと、グラフェム単位(人が見たままの文字数)で分割できる
ちなみに`const segmenter = new Intl.Segmenter("ja", { granularity: "grapheme" });`の結果は↓
```js
[
  { segment: '家', index: 0, input: '家族 👨‍👨‍👧‍👧' },
  { segment: '族', index: 1, input: '家族 👨‍👨‍👧‍👧' },
  { segment: ' ', index: 2, input: '家族 👨‍👨‍👧‍👧' },
  { segment: '👨‍👨‍👧‍👧', index: 3, input: '家族 👨‍👨‍👧‍👧' }
]
```
ここから`segment`を取り出して`reverse()`で反転して`join()`で結合している

### ゼロ幅接合子とは
- ゼロ幅接合子（ZWJ）は、Unicodeで定義されている制御文字で、隣接する文字を結合して1つのグラフェム（人間が見たままの文字）として扱うために使用される。例えば、絵文字の複数の部分を結合して1つの絵文字を形成する際に使われる。
- 例えば、👨‍👩‍👧‍👦は一つの絵文字に見えるが、実は👨 ZWJ 👩 ZWJ 👧 ZWJ 👦のようになっている
- Unicodeでは、ZWJはU+200Dで定義されている
```js
console.log("👨" + "\u200D" + "👩" + "\u200D" + "👧");//👨‍👩‍👧
```