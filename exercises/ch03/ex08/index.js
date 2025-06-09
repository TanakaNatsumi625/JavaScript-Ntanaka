//Number() : 数値型に変換する。変換できない場合はNaNを返す。
// 変換できる値は数値、文字列、真偽値など。
console.log(Number(true));
console.log(Number(1234));
console.log(Number("test")); // NaN

// Boolean() : 真偽値に変換する。変換できない場合はfalseを返す。
//JSでは、以下の値はfalseとみなされる: 0, "", null, undefined, NaN
console.log(Boolean(1234)); // true
console.log(Boolean(0)); // false

// String() : 文字列に変換する。変換できない場合は空文字列を返す。
console.log(String(true)); // "true"
console.log(String(1234)); // "1234"

//perseInt() : 文字列から整数を抽出する。：以降は無視される。変換できない場合はNaNを返す。
console.log(parseInt("12,742 km：地球の直径")); // 12
console.log(parseInt("1.618：黄金比")); // 1
