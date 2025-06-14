// typeofの予想
// `undefined`：undefined
// `null`：object
// `オブジェクト`：object
// `NaN`：NaN
// `数値`：number
// `関数`：function

//結果
console.log(typeof undefined); // undefined：〇
console.log(typeof null); // object：〇
console.log(typeof {}); // object：〇
console.log(typeof NaN); // number：×
console.log(typeof 42); // number：〇
console.log(typeof function() {}); // function: 〇

