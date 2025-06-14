元のコード
```javascript
for (i = 1; i < 101; i++)
  console.log((i % 3 ? "" : "Fizz") + (i % 5 ? "" : "Buzz") || i);
```

Fizzの場合：(i % 3 ? "" : "Fizz")で評価される
i%3の余りがない場合、Fizzを出力し、そうでない場合は""(空文字)を出力する

Buzzの場合：(i % 5 ? "" : "Buzz")で評価される
i%⑤の余りがない場合、Fizzを出力し、そうでない場合は""(空文字)を出力する

FizzBuzzの場合：(i % 3 ? "" : "Fizz") + (i % 5 ? "" : "Buzz")で評価される
＋演算子の左辺がFizzで、右辺がBuzzの場合はFizzBuzzを返す

数値が返る場合：|| i
両辺が“”の場合、数値iを返す

メモ
JavaScript の A || B は：
A が true → A を返す（B は無視）
A が false → B を返す
空文字 "" は false とみなされる(p91,4段落,3行目)