# 何故undefinedの代わりにvoid 0を使ったのか
undefinedはグローバル変数なので、以下のように書き換えることが可能である
```js
alert(undefined); // "undefined"
var undefined = "こんにちは";
alert(undefined) // "こんにちは"
```
そのため、undefinedである保証がないため、使われるのを避けるべきと考えられた。対してvoid 0は必ずundefinedを返すので、安全と考えられた。


# 今ではこのような書き方をしないのは何故か
- ECMAScript 5 仕様以降、書き換えが不可能になっているため
- 可読性を上げるため