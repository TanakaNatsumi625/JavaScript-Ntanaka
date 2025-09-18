//index.jsで再エクスポートされたものをインポートして使う
import { Calculator, addTest } from "./index.js";

console.log(addTest(10, 20)); // => 30

const calc = new Calculator();
console.log(calc.multiply(6, 7)); // => 42
