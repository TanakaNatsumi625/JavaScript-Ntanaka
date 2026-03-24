// 修正前
// let a, x, y;
// const r = 10;

// with (Math) {
//     a = PI * r * r;
//     x = r * cos(PI);
//     y = r * sin(PI / 2);
// }

// console.log(a, x, y);

// 修正後
const r = 10;

const a = Math.PI * r * r;
const x = r * Math.cos(Math.PI);
const y = r * Math.sin(Math.PI / 2);

console.log(a, x, y);
