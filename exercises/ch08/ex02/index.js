//テスト用にexportする
export { squaredWithRecursion, squaredWithLoop, powIterative };

const squaredWithRecursion = (x, n) => {
    if (x === 0) {
        return 0; // 0の累乗は常に0
    }
    if (n < 0) {
        throw new Error("負の累乗は未対応です");
    }
    if (n === 0) {
        return 1; // 0乗は常に1
    }

    return x * squaredWithRecursion(x, n - 1); // 再帰的に計算
}

//一番思いつくやり方。時間計算量にはO(n)になる
const squaredWithLoop = (x, n) => {
    //後程計算回数を比較したいので、計算のカウンターを定義する
    let count = 0;
    if (x === 0) {
        return { result: 0, calcCount: count }; // 0の累乗は常に0
    }
    if (n < 0) {
        throw new Error("負の累乗は未対応です");
    }
    if (n === 0) {
        return { result: 1, calcCount: count }; // 0乗は常に1
    }

    let result = 1;
    for (let i = 0; i < n; i++) {
        result *= x;
        count++; // 計算回数をカウント
    }
    return { result: result, calcCount: count }; // ループで計算
}

//早くべき乗を計算するための関数を定義
//偶数指数なら x^n = (x^(n/2))^2として計算
//奇数指数なら x^n = x * (x^(n-1))として計算
//指数が半分ずつ減っていくので、その分計算回数が減る(計算回数： log2 n)
//時間計算量としてはO(log n)になる
//ループで書く
function powIterative(x, n) {
    //計算回数をチェック
    let count = 0;

    if (x === 0) {
        return { result: 0, calcCount: count }; // 0の累乗は常に0
    }
    if (n < 0) {
        throw new Error("負の累乗は未対応です");
    }
    if (n === 0) {
        return { result: 1, calcCount: count }; // 0乗は常に1
    }
    // x の n 乗を計算する
    let exp = n;
    let base = x;

    let result = 1;
    // exp は非負の整数
    while (exp > 0) {
        count++; // 計算回数をカウント
        // exp が偶数なら、base を二乗して exp を半分にする
        if (exp % 2 === 0) {
            base *= base;
            exp /= 2;
        } else {
            // exp が奇数なら、result に base を掛けて exp を1減らす
            //x * (x^(n-1))の最初のxの部分。x^(n-1)はその後は偶数になる
            result *= base;
            exp -= 1;
        }
    }
    return { result: result, calcCount: count };
}

console.log(squaredWithRecursion(2, 3)); // 出力結果: 8
console.log(squaredWithLoop(2, 10)); // 出力結果: { result: 1024, calcCount: 10 }
console.log(squaredWithLoop(5, 0)); // 出力結果: { result: 1, calcCount: 0 }
console.log(powIterative(2, 10)); // 出力結果: { result: 1024, calcCount: 5 }
console.log(powIterative(5, 0)); // 出力結果: { result: 1, calcCount: 0 }
