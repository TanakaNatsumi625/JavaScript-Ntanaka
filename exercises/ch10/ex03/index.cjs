//main.jsを読み込む
const math = require("./main.cjs");
// mathモジュールの関数を使う
console.log(math.add(5, 3)); // 8
// mathモジュールのクラスを使う
const calculator = new math.Calculator();
console.log(calculator.multiply(4, 7)); // 28
