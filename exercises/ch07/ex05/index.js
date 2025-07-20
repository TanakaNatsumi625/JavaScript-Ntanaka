const seq = [1, 2, 3, 4, 5];
// 配列操作関数の定義
export function pop(seq) {
    if (!Array.isArray(seq)) {
        return "配列が指定されていません";
    }
    //slice(): 配列の一部を抽出して新しい配列を返す。引数を指定しない場合は配列要素の最後までが格納(p188)
    let newSeq = seq.slice(); // 元の配列を変更しないためにコピー
    //-1 が引数として指定された場合、配列の末尾からさかのぼって数える。－1は4になる。
    //https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
    return seq.slice(0, -1);
}

export function push(seq, value) {
    if (!Array.isArray(seq)) {
        return "配列が指定されていません";
    }
    //concat(): 配列を結合して新しい配列を返す(p186)
    return seq.concat(value);
}
export function shift(seq) {
    if (!Array.isArray(seq)) {
        return "配列が指定されていません";
    }
    //slice(1): 配列の先頭を削除して新しい配列を返す(p188)
    //構文：slice(start)⇒今回は1要素目から最後まで
    return seq.slice(1);
}

export function unshift(seq, value) {
    if (!Array.isArray(seq)) {
        return "配列が指定されていません";
    }
    //concat(): 配列を結合して新しい配列を返す(p186)
    return [value].concat(seq);
}

export function sort(seq, compareFn) {
    if (!Array.isArray(seq)) {
        return "配列が指定されていません";
    }
    //sort(): 配列を並べ替えて新しい配列を返す(p189)
    return seq.slice().sort(compareFn);
}
console.log(pop(seq)); // [1, 2, 3, 4]
console.log(push(seq, 6)); // [1, 2, 3, 4, 5, 6]
console.log(shift(seq)); // [2, 3, 4, 5]
console.log(unshift(seq, 0)); // [0, 1, 2, 3, 4, 5]
console.log(sort(seq, (a, b) => b - a)); // [5, 4, 3, 2, 1]

// 元の配列は変更されていない
console.log(seq); // [1, 2, 3, 4, 5]