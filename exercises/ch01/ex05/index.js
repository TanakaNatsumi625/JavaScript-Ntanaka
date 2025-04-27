import { array } from "yargs";

export function abs(x) {
    if (x >= 0) {
        return x;
    }
    return -x;
}

export function sum(array) { //配列の要素を合計する
    let sum = 0;
    for (let x of array){ //各要素を取り出す
        sum += x;
    }
    return sum;
}

export function factorial(n) {
    // n が 0 の場合は 1 を返す
    if (n === 0) {
        return 1;
    }
    // n が 0 でない場合は n * (n-1)! を返す
    return n * factorial(n - 1);
}