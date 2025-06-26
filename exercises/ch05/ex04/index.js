export function fibonacciWhile (){
    const result = [1, 1];
    let i = 2;

    while (i <= 9) {
        result[i] = result[i - 1] + result[i - 2];
        i++;
    }

    return result;
}

export function fibonacciDoWhile () {
    const result = [1, 1];
    let i = 2;

    do {
        result[i] = result[i - 1] + result[i - 2];
        i++;
    } while (i <= 9);

    return result;
}

export function fibonacciFor (){
    const result = [1,1];

    for (let i = 2; i <= 9; i++) {
        result[i] = result[i - 1] + result[i - 2];
    }

    //console.log(result[n]);
    return result;
}

// 動作確認
console.log(fibonacciFor()); 
console.log(fibonacciWhile());
console.log(fibonacciDoWhile());