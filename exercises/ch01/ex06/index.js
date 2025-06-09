export function fib (n){
    const result = [0,1];

    for (let i = 2; i <= n; i++) {
        result[i] = result[i - 1] + result[i - 2];
    }

    //console.log(result[n]);
    return result[n];
}

//動作チェック
//fib(75);

//以下は時間がとてもかかる(同じ計算を何度も使うので)
// export function fib (n){
//     if (n <= 1) {
//         return n;
//     }
//     return fib(n - 1) + fib(n - 2); 
// }

//他のやり方
// export function fib (n){
//     if (n <= 1) {
//         return n;
//     }
//     let [a, b] = [0, 1];
//     for (let i = 2; i <= n; i++) {
//         [a, b] = [b, a + b];
//     }
//     return b;
// }