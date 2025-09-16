// デフォルトエクスポートを名前を変えてインポート
//元はaddという名前だったものをsumという名前でインポート
import sum from "./math.js";

// 名前付きエクスポートを「名前を変えて」インポート
import { Calculator as Calc } from "./math.js";

// デフォルト関数を使う
console.log(sum(2, 3));  //5

// クラスを使う
const c = new Calc();
console.log(c.multiply(4, 5));  // 20

