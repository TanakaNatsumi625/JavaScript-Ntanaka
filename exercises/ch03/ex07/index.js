export function equalArrays(a, b) {
  if (a === b) return true;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

//配列も文字列もlengsは同じ
// const x = [1, 2, 3];
// const y = "123"
// console.log(x.length);
// console.log(y.length);