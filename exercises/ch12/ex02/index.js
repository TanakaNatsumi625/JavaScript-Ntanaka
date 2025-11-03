export function fibonacciIterator() {
  let x = 0, y = 1;
    return {
      [Symbol.iterator]() {
        return  this},
      next() {
        [x, y] = [y, x + y];
        return { value: y, done: false };
      }
    };
}

// 以下、動作確認コード
// n 番目のフィボナッチ数を返す。

function fibonacciIter(n) {
  const iter = fibonacciIterator();
  const iterator = iter[Symbol.iterator]();
  let result;
  for (let i = 0; i < n; i++) {
      result = iterator.next().value;
  }
  return result;  
}

console.log(fibonacciIter(20)) // => 10946