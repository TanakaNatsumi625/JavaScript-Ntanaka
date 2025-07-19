export function sum(array) {
    if (!Array.isArray(array)) {
        array = [];
    };
    //配列の要素をすべて足し合わせる
    //reduce()を使う
    let result = array.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    console.log(result);
    return result;
}

//参考：https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/join
export function join(array, separator = ",") {
    if (array === undefined) {
      throw new Error("配列が指定されていません");
    }
  
    return array.reduce((acc, curr, index) => {
        return index === 0 ? `${curr ?? ""}` : acc + String(separator) + (curr ?? "");
      }, "");
  }

export function reverse(array) {
    //配列を反転させる
    let result = array.reduce((reversed, currentValue) => [currentValue, ...reversed], []);
    console.log(result);
    return result;
}

export function every(array, callback) {
    return array.reduce((acc, currentValue, index, arr) => {
      // すでに false なら判定スキップ
      if (!acc) return false;
      // コールバックの戻り値が false なら結果を false にする
      // sparse（空要素）も currentValue は undefined で渡されるので問題なし
      return callback(currentValue, index, arr);
    }, true);
  }

  export function some(array, callback) {
    return array.reduce((acc, current, index, arr) => {
      // acc が true になっていたらそのまま true を返す（結果を維持）
      // そうでなければ callback を実行して結果を返す
      return acc || callback(current, index, arr);
    }, false);
  }
  

console.log(every([]))