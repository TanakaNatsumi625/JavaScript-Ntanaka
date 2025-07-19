export function addMatrices(i, j) {
const rows = i.length;
const cols = i[0].length;

if (rows !== i.length || cols !== j[0].length) {
    return "行列のサイズが一致しません。";
  }

  const result = [];

  for(let r = 0; r < rows; r++) {
    result[r] = [];
    for (let c = 0; c < cols; c++) {
      result[r][c] = i[r][c] + j[r][c];
    }
  }

  return result;
}
//動作確認
console.log(addMatrices([[1, 2], [3, 4]], [[5, 6], [7, 8]]));// [[6, 8], [10, 12]]
console.log(addMatrices([[1, 2], [4, 5]], [[7, 8, 9]]));// "行列のサイズが一致しません。"

export function multiplyMatrices(i, j) {
  const rows = i.length;
  const cols = j[0].length;
  const inner = i[0].length;

  if (inner !== j.length) {
    return "行列のサイズが一致しません。";
  }

  const result = [];

  for (let r = 0; r < rows; r++) {
    result[r] = [];
    for (let c = 0; c < cols; c++) {
      result[r][c] = 0;
      for (let k = 0; k < inner; k++) {
        result[r][c] += i[r][k] * j[k][c];
      }
    }
  }

  return result;
}

//動作確認
console.log(multiplyMatrices([[1, 2], [3, 4]], [[5, 6], [7, 8]]));// [[19, 22], [43, 50]]
console.log(multiplyMatrices([[1, 2], [4, 5]], [[7, 8, 9]]));// "行列のサイズが一致しません。"