参考：https://teratail.com/questions/156083
- 上記より、入れ子になった括弧は現行のJavaScriptでは対応していない
- 一段階の入れ子であれば`/[()*]/`で良い
- 部分式呼び出しという機能を持った高度な正規表現を使う必要があり、これに対応しているのはPHPやRubyしかない
- JavaScriptでやるならスタックでやる方法がある
```js
function isBalanced(str: string): boolean {
  let stack = 0;
  for (const ch of str) {
    if (ch === '(') stack++;
    else if (ch === ')') {
      if (stack === 0) return false;
      stack--;
    }
  }
  return stack === 0;
}

console.log(isBalanced("(()(()))")); // true
console.log(isBalanced("((())"));    // false
```