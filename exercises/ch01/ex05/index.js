export function abs(x) {
  // 0 より小さい場合は -x を返す。そうでない場合はそのまま返す
  return x < 0 ? -x : x;
}

export function sum(x,y) {
    // x と y を足して返す
    return x + y;
}

export function factorial(n) {
    // n が 0 の場合は 1 を返す
    if (n === 0) {
        return 1;
    }
    // n が 0 でない場合は n * (n-1)! を返す
    return n * factorial(n - 1);
}