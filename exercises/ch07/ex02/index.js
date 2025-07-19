function fizzbuzz(n) {
    //与えられた数字までの数を配列にする
    let number = Array.from({ length: n }, (_, i) => i + 1);
    //各要素に対してfizzbuzzの判断し、結果を配列にして返す→map()使う
    //条件 ? 真のときの値 : 偽のときの値”
    let result = number.map(num => 
        num % 15 === 0 ? "fizzbuzz" :
        num % 3 === 0 ? "fizz" :
        num % 5 === 0 ? "buzz" :
        num
    )
    console.log(result);
    return result;
  }
  
  function sumOfSquaredDifference(f, g) {
    //この関数は、配列fとgの要素ごとの差の二乗の合計を計算する
    //配列ｆに対してreduce()を使う
    //sumは累積値、valは配列fの現在の要素、iは現在の要素のインデックス
    let result = f.reduce((sum, val, i) => sum + (val - g[i]) ** 2, 0);
    console.log(result);
    return result
  }
  
  function sumOfEvensIsLargerThan42(array) {
    //配列の要素を偶数に絞る⇒filter()使う
    let evens = array.filter(num => num % 2 === 0);
    //その偶数の合計値を求める
    let sum = evens.reduce((x, y) => x + y, 0);
    //合計値が42より大きいかどうかを返す
    console.log(sum > 42);  
    //下のようにすっきり書くのもあり
    // let result = array.filter(num => num % 2 === 0)
    //   .reduce((x, y) => x + y, 0) > 42;
    return sum > 42;
  }

  
//動作確認
fizzbuzz(100); // 1から100までのfizzbuzzを出力
const f = [1, 2, 3, 4, 5];
const g = [5, 4, 3, 2, 1];
sumOfSquaredDifference(f, g); // fとgの要素ごとの差の二乗の合計を出力
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
sumOfEvensIsLargerThan42(array); // 偶数の合計が42より大きいかどうかを出力
