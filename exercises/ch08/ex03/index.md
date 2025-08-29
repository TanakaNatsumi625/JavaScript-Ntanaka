1. プログラミング言語や処理系によっては、再帰呼び出しを関数の処理の末尾にする(末尾再帰)ことで、スタックオーバーフローが起こらないよう最適化できるものがある。末尾再帰は何故そのような最適化ができるのか答えなさい。

- 参考：https://qiita.com/pebblip/items/cf8d3230969b2f6b3132
- 末尾再帰とは、関数の最後( =return)が再帰関数になっていること
- 通常の再帰関数では以下のように階層が深くなってしまい、スタックオーバーフローが起きてしまう
- これは通常関数が実行される際、関数自身のローカル変数（引数や局所変数）や戻り先情報を保持するスタックフレーム（アクティベーションレコード）が生成されてコールスタックと呼ばれるスタックにpushされるので、再帰する関数が多いと、終了していない関数の情報であふれてしまう
- そこで末尾再帰にすることで、returnした時点でその関数の引数や変数を覚えておく必要がなくなり、結果を別の関数に投げるだけで終わるのでスタックオーバーフローしにくくなる
```js
function sum(n, acc = 0) {
  if (n === 0) return acc;
  return sum(n - 1, acc + n); // 最後に呼ぶだけ（末尾）
}
sum(3);
//sum(3, 0) → 「次は sum(2, 3)」に結果を返すだけ
//sum(2, 3) → 「次は sum(1, 5)」に結果を返すだけ
//sum(1, 5) → 「次は sum(0, 6)」に結果を返すだけ
//sum(0, 6) → 6 を返す（終了）
```
2. JavaScript で末尾再帰最適化を実装している処理系を答えなさい。  
   利用できる環境があれば、実際に以下の URL を表示・実行してエラーが発生しないことを確認しなさい。  
   https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABMAhtOAnGKA2AKMALkTBAFsAjAUwwEpEBvAWAChFlxp4kYoa8ADhjgATENGKlKNADSIIccHwyTy1Oo1bt2MYIjwKlNRAD4S9Zm23sMVKCAxIho8VADcW7QF9PNuw55lQWExaEQAKnlFMGU5QxjjAGpEAEZaDysfK1t7R0RefhS5NIys1gUwAGc4HCoAOhw4AHM8VHQsXDwUgAZe3tp01iA
- ECMAScript 6でサポートされている
- 参考：https://webkit.org/blog/6240/ecmascript-6-proper-tail-calls-in-webkit/
- chromeでは使えない
- 実行結果
```
[ERR]: "Executed JavaScript Failed:" 
[ERR]: Maximum call stack size exceeded
```
-Safaryでは実行できた
- 実行結果
```
[Log]: Infinity
```