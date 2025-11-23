## React
### XSSへの対策「
- 参考：https://qiita.com/kazzzzzz/items/897f8ed89ca36a0734de
- 基本的にはHTMLエスケープが行われている
```js
const App = () => {
  const userInputText1 = `<script>alert("XSS!")</script>`;
  const userInputText2 = `<div>DIV!</div>`;

  return (
    <div>
      {userInputText1}
      {userInputText2}
    </div>
  );
}
```
- 出力結果
```
<script>alert("XSS!")</script>
```
- {}で囲まれているものは基本エスケープされる

### XSSが発生するパターン
- `dangerouslySetInnerHTML`の利用
    - Reactのエスケープを無効化するオプション
    - 基本的には使わないが、どうしてもHTMLとして認識させたい場合などに利用する。よって使う場合は徹底的なエスケープ
-  javascriptスキームの悪用
    - href属性：頭がjavascript:から始まる場合はそれ以降の文字列をjavascriptとして実行する
    - 先頭からユーザーが決められる文字列を挿入しない。そもそも先頭に/をつける。

