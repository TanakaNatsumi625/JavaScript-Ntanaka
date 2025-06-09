``` javascript
let a
a
=
3
console.log(a)
```
出力結果：./ex08/index1.json
AST図：<img src="./ex08/ch02_ex08_AST_1.png" width="30%">



``` javascript
let a; a = 3; console.log(a);
```
出力結果：./ex08/index2.json
AST図：<img src="./ex08/ch02_ex08_AST_2.png" width="30%">

以上の結果から、改行や；が異なっていてもロジック的にはどちらも同じであることが分かった

メモ：プログラム読むときは一回木構造になるという問題