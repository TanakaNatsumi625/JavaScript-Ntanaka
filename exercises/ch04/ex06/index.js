// 何らかのリサイズを行う関数と思って読んで下さい
//
// - params には undefined またはオブジェクトが与えられる
// - params.maxWidth が与えられる場合 (正の整数と仮定して良い) はその値を利用する
// - params.maxHeight が与えられる場合 (正の整数と仮定して良い) はその値を利用する

function resize(params) {
    let maxWidth = 600;
    let maxHeight = 480;
    
    //|| の左が falsy なら右を返す”
    //|| の左が truthy なら左を返す”
    //undefinedが以下はカバーできていない
    // maxWidth = params.maxWidth || maxWidth;
    // maxHeight = params.maxHeight || maxHeight;

    maxWidth = (params && params.maxWidth) || maxWidth;
    maxHeight = (params && params.maxHeight) || maxHeight;

    console.log({ maxWidth, maxHeight });
}

//動作確認
const params1 = { maxWidth: 800, maxHeight: 600 };
resize(params1); // { maxWidth: 800, maxHeight: 600 }
const params2 = { maxWidth: 800 };
resize(params2); // { maxWidth: 800, maxHeight: 480 }
const params3 = {  };
resize(params3); // { maxWidth: 600, maxHeight: 480 }


//?や??を使って設定する
function resize2(params) {
    let maxWidth = 600;
    let maxHeight = 480;

    // params.maxWidth が undefined の場合は maxWidth をそのまま利用する
    // params.maxHeight が undefined の場合は maxHeight をそのまま利用する
    maxWidth = params.maxWidth ?? maxWidth;
    maxHeight = params.maxHeight ?? maxHeight;

    console.log({ maxWidth, maxHeight });
}