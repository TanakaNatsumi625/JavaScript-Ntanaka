//P149 冒頭のコード
let o = {}; // o はObject.prototype からメソッドを継承し、
o.x = 1; // 独自プロパティx を持つ。
let p = Object.create(o); // p はo とObject.prototype からプロパティを継承し、
p.y = 2; // 独自プロパティy を持つ。
let q = Object.create(p); // q は、p、o、Object.prototype からプロパティを継承し、
q.z = 3; // 独自プロパティz を持つ。
let f = q.toString(); // toString はObject.prototype から継承する。
q.x + q.y // => 3; x とy はそれぞれo とp から継承する。

//` o` が `p` および `q` のプロトタイプチェーン上に存在すること、および、`p` が `q` のプロトタイプチェーン上に存在することを確認しなさい。
//オブジェクトはprototypeプロパティは持たない。のでo.prototype.isPrototypeOf(p)のように書くとエラーになる。
console.log(o.isPrototypeOf(p)); // true
console.log(o.isPrototypeOf(q)); // true
console.log(p.isPrototypeOf(q)); // true

//また同様に、`Object`, `Array`, `Date`, `Map` のプロトタイプチェーンの継承関係を確認するためのコードも書きなさい。
console.log(Object.prototype.isPrototypeOf(new Array())); // true
console.log(Object.prototype.isPrototypeOf(new Date())); // true
console.log(Object.prototype.isPrototypeOf(new Map())); // true
