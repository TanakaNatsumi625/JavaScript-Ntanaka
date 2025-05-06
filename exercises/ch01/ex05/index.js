export function abs(x) {
    if (x >= 0) {
        return x;
    }
    else {
        return -x;
    }
}

export function sum(array) { //配列の要素を合計する
    let sum = 0;
    for (let x of array) { //各要素を取り出す
        sum += x;
    }
    return sum;
}

export function factorial(n) {//階乗
    let product = 1;
    while(n > 0) { //nが0より大きい間
        product *= n; //productにnを掛ける
        n--; //n-1
    }
    return product; 
}

//動作確認
console.log(abs(-5)); //5
console.log(sum([1, 2, 3])); //6
console.log(factorial(3)); //6