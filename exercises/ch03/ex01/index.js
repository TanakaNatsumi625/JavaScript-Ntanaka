function calculation() {
    let infPulse = Infinity + Infinity;
    let infminus = Infinity - Infinity;
    let infmultiply = Infinity * Infinity;
    let infdivide = Infinity / Infinity;

    let nanPulse = NaN + NaN;
    let nanminus = NaN - NaN;
    let nanmultiply = NaN * NaN;
    let nandivide = NaN / NaN;


    console.log("Infinity + Infinity = " + infPulse);
    console.log("Infinity - Infinity = " + infminus);
    console.log("Infinity * Infinity = " + infmultiply);
    console.log("Infinity / Infinity = " + infdivide);

    console.log("NaN + NaN = " + nanPulse);
    console.log("NaN - NaN = " + nanminus);
    console.log("NaN * NaN = " + nanmultiply);
    console.log("NaN / NaN = " + nandivide);

    //結果
    //Infinity + Infinity = Infinity
    // Infinity - Infinity = NaN
    // Infinity * Infinity = Infinity
    // Infinity / Infinity = NaN
    // NaN + NaN = NaN
    // NaN - NaN = NaN
    // NaN * NaN = NaN
    // NaN / NaN = NaN

}

calculation();

//配列に[Infinity, -Infinity, NaN]を入れて、forでループする方法もある
// let numbers = [Infinity, -Infinity, NaN];
// for (let a of numbers) {
//     for(let b of numbers ){
//         console.log(`${a} + ${b} = ${a + b}`); // Infinity + Infinity = Infinity
//         console.log(`${a} - ${b} = ${a - b}`); // Infinity - Infinity = NaN
//         console.log(`${a} * ${b} = ${a * b}`); // Infinity * Infinity = Infinity
//         console.log(`${a} / ${b} = ${a / b}`); // Infinity / Infinity = NaN
//     }
// }