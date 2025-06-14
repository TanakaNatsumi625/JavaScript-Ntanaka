// 与えられた数値を 32 ビット整数表現形式で表現した場合に 1 であるビットの数を返す関数 `bitCount` を書く
export function bitCount(bitnumber) {
    // 32ビット整数に変換(ビット演算子>>>を使うと32ビットとしt解釈される)
    //左に0ビットシフト→上位は0で埋める→符号なしに変換される
    let number = bitnumber >>> 0; // 符号なし整数に変換
    console.log(`Converting ${bitnumber} to 32-bit unsigned integer: ${number}`);
    let count = 0;
    // ビットごとにチェック
    while (number > 0) {
        // 最下位ビットが1ならカウント
        if (number & 1) {
            count++;
        }
        // ビットを右にシフト
        number = number >>> 1;
    }
    // カウントを返す
    console.log(`The number of 1 bits in ${bitnumber} is: ${count}`);
    return count;
}

//動作確認
bitCount(0b111); 
bitCount(0b1111111111111111111111111111111);
bitCount(-1); 