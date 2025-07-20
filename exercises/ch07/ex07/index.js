//バブルソートを実装する
//console.logはソートの過程を表示するために使用されている
export function bubbleSort(
    array,
    compare = (lhs, rhs) => (lhs < rhs ? -1 : lhs > rhs ? +1 : 0)
) {
    //元の配列を壊さないようにコピーを保存
    const arr = array.slice();
    //配列の長さ分ループを回す→全体を周回する
    for (let i = 0; i < arr.length - 1; i++) {
        //各集会で隣り合う要素を比較・交換
        for (let j = 0; j < arr.length - 1 - i; j++) {
            //compare関数を使って要素を比較
            if (compare(arr[j], arr[j + 1]) > 0) {
                //交換が必要な場合は要素を入れ替える
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;

}

const array = [5, 3, 8, 4, 2];
console.log(bubbleSort(array));
console.log(sort(array)); // [2, 3, 4, 5, 8]









//挿入ソートメモ
//array: ソートしたい配列
//compare: 比較関数。デフォルトは昇順ソート
function sort(
    array,
    compare = (lhs, rhs) => (lhs < rhs ? -1 : lhs > rhs ? +1 : 0)
) {
    // array[0 ... i-1] が常にソート済みになるように処理を進める
    // (0 <= j < i-1 に対して compare(array[j], array[j + 1]) <= 0 が成り立つ)
    //i: ソート済みに挿入したい要素の位置。0要素目はすでにソート済みとみなすので1から始める
    for (let i = 1; i < array.length; i++) {
        console.log(i + '番目');
        //　挿入したい値をvに一時保存
        const v = array[i];
        console.log("v = " + v + " を挿入します");

        // array[i] を array[0 ... i] の適切な場所に挿入する
        let j = i;
        // array[j - 1] と v を比較して、v が小さい場合は array[j - 1] を array[j] に移動
        //array[j - 1]がvより大きかったらループを続ける
        while (j > 0 && compare(array[j - 1], v) > 0) {
            console.log('j =' + j);
            console.log(v + " " + array[j - 1] + " compare");
            array[j] = array[j - 1];
            j--;
        }
        array[j] = v;
        console.log(`array: `, array);
    }
    return array;
}