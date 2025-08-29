//通常の再帰関数
function factorial(n) {
    if (n === 0) {
        return 1;
    }
    return n * factorial(n - 1);
}

console.log(factorial(100)); //9.33262154439441e+157
console.log(factorial(1000));//Infinity
console.log(factorial(10000)); //Infinity
//console.log(factorial(100000));
//RangeError: Maximum call stack size exceeded
// at factorial (file:///C:/Users/r00000625/myRipository/JavaScript-Ntanaka/exercises/ch08/ex03/index.js:1:19)
//     at factorial (file:///C:/Users/r00000625/myRipository/JavaScript-Ntanaka/exercises/ch08/ex03/index.js:5:16)
//     at factorial (file:///C:/Users/r00000625/myRipository/JavaScript-Ntanaka/exercises/ch08/ex03/index.js:5:16)
//     at factorial (file:///C:/Users/r00000625/myRipository/JavaScript-Ntanaka/exercises/ch08/ex03/index.js:5:16)
//     at factorial (file:///C:/Users/r00000625/myRipository/JavaScript-Ntanaka/exercises/ch08/ex03/index.js:5:16)
//     at factorial (file:///C:/Users/r00000625/myRipository/JavaScript-Ntanaka/exercises/ch08/ex03/index.js:5:16)
//     at factorial (file:///C:/Users/r00000625/myRipository/JavaScript-Ntanaka/exercises/ch08/ex03/index.js:5:16)
//     at factorial (file:///C:/Users/r00000625/myRipository/JavaScript-Ntanaka/exercises/ch08/ex03/index.js:5:16)
//     at factorial (file:///C:/Users/r00000625/myRipository/JavaScript-Ntanaka/exercises/ch08/ex03/index.js:5:16)
//     at factorial (file:///C:/Users/r00000625/myRipository/JavaScript-Ntanaka/exercises/ch08/ex03/index.js:5:16)