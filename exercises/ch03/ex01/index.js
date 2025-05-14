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