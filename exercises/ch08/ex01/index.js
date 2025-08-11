//引数が二つなので括弧は必要
//return文だけではないので、こちらも{}が必要
const output = (n, c) => {
  let result = [];
  for (let i = 0; i < n; i++) {
    console.log(c);
    result.push(c);
  }
  return result;
}

//動作確認
console.log(output(3, 'Hello')); 
//出力結果
// Hello
// Hello
// Hello
// [ 'Hello', 'Hello', 'Hello' ]

// 引数が一つなので括弧は不要
// return文だけなので、{}も不要
const squared = x => x * x;

// 動作確認
console.log(squared(5));// 出力結果: 25

//現在時刻のプロパティ`now`を含むオブジェクトを返す
//引数が無いので、()が必要
//返り値については、オブジェクトを返すので{}か()でくくる必要あり
const getCurrentTime1 = () => {
  return {
    now: new Date()
  };
};
const getCurrentTime2 = () => ({
    now: new Date()
    });
// 動作確認
console.log(getCurrentTime1()); // 出力例: { now: 2023-10-01T12:00:00.000Z }
console.log(getCurrentTime2()); // 出力例: { now: 2023-10-01T12:00:00.000Z }

//テスト用にexportする
export { output, squared, getCurrentTime1, getCurrentTime2 };