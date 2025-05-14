export function isValue (a, b){
    const tolerance = 1e-10;
    return Math.abs(a - b) < tolerance;
};

//動作確認
console.log(isValue(0.2-0.1, 0.1)); // true