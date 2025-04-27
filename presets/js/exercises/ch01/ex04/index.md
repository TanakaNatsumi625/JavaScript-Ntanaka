以下の内容を index.html に保存し、Web ブラウザで開きなさい。
開発者ツール (Chrome の場合 F12) のコンソール上に何が表示されるか予想し、結果が一致するか確認しなさい。
--回答--
予想：コンソールログが二つ表示される。一つ目は{answer: 42}と表示され、二つ目は{answer: 0}と表示される
結果：両方とも{answer: 0}と表示された

開発者ツールを開いた状態のタブで HTML を開く場合と、HTML を開いた状態のタブで開発者ツールを開く場合とで、結果を比較しなさい
--回答--
開発者ツールを開いた状態でHTMLを開く：コンソールログのうち、一つ目は{answer: 42}、二つ目は{answer: 0}と表示された
HTMLを開いた状態で開発者ツールを開く：両方とも{answer: 0}が表示される

また、常に期待した結果を得るためにはどのようにコードを修正すべきか答えなさい。
--回答--
JSON.parse(JSON.stringify())を使用し、以下のように書き換える
```html
<!DOCTYPE html>
<html>
  <body>
    <script>
      let life = { answer: 42 };
      console.log(JSON.parse(JSON.stringify(life)));
      life.answer = 0;
      console.log(JSON.parse(JSON.stringify(life)));
    </script>
  </body>
</html>
```
--メモ--
console.log()はオブジェクト参照なので、lifeの中身が変わればログも変わる。
HTML を開いた状態のタブで開発者ツールを開く場合だと、lifeの中身が変わった後のオブジェクトを参照してしまうので、
二つとも{answer: 0}の要に表示されてしまう。
参考：https://zenn.dev/ymmt1089/articles/20221103_consolelog
https://developer.mozilla.org/ja/docs/Web/API/console/log_static#%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E3%81%AE%E3%83%AD%E3%82%B0%E5%87%BA%E5%8A%9B
