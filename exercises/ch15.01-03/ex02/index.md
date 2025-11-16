## 環境構築
- 以下の観点から、LiveServerを`npm install`してHTMLの実行環境を作成した
    - 簡単に起動できる
    - ファイルの変更をリアルタイムでブラウザに反映できる
- 参考：https://note.com/yukikkoaimanabi/n/n8461cf9c825c

## 動作確認手順
1. ex02フォルダ内にHTMLフォルダ、JSフォルダを作成し、それぞれindex.html, index.jsファイルを作成する
2. index.jsは半径5の円の面積を求める関数にし、index.html内のボタンを押下すると`半径 5 の円の面積は ${mod.areaCircle(5)}`のアラートが出る仕様にする
3. それぞれのファイルを以下のポートで起動する
    - index.html：http://127.0.0.1:8080/
    - index.js：http://127.0.0.1:5500/exercises/ch15.01-03/ex02/JS/index.js
4. index.htmlで`await import('http://127.0.0.1:5500/exercises/ch15.01-03/ex02/JS/index.js');`とimpotすることで、ボタンを押下したとき別ポートからindex.jsがインポートされ、処理が実行される（cross-site）
5. インポート成功の結果として、アラートが表示される