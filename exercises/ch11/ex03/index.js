//Uint32Array は 1要素 = 4バイト
export function littleToBigEndian(arr) {
    if (!(arr instanceof Uint32Array)) {
        throw new Error('Uint32Arrayのインスタンスを渡してください');
    }
    //渡された配列のバイトの場所、位置、長さを指定してDataViewを作成
    //arrが確保しているバイトに読み書きができるようになる
    let view = new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
    const result = new Uint32Array(arr.length);

    for (let i = 0; i < arr.length; i++) {
        //明示的にリトルエンディアンとして読む(PC的にはリトルエンディアンとしてそもそも読み込んでいるが、明示的にするため)
        view.getUint32(i * 4, arr[i],true);
        //0バイト目からリトルエンディアンで読む
        //一要素32ビット＝32/8ビット＝4バイトなので、4バイトずつずらしていく（＝i*4）
        //0バイト目からビッグエンディアンで書き込む
        const bigEndian = view.getUint32(i * 4);
        result[i] = bigEndian;
    }
    return result;
}

export function bigToLittleEndian(arr) {
    if (!(arr instanceof Uint32Array)) {
        throw new Error('Uint32Arrayのインスタンスを渡してください');
    }

    let view = new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
    const result = new Uint32Array(arr.length);
    
    for (let i = 0; i < arr.length; i++) {
        //明示的にビッグエンディアンとして書き込む
       view.setUint32(i * 4, arr[i], false);
        //リトルエンディアンとして読み込む
        const littleEndian = view.getUint32(i * 4, true);
        result[i] = littleEndian;
    }
    return result;
}

//動作確認
const originalArr = new Uint32Array([0x12345678, 0xabcdef12]);
const bigEndianArr = littleToBigEndian(originalArr);
console.log('変換後:');
for (const x of bigEndianArr) {
  console.log('0x' + x.toString(16));
}

const littleEndianArr = bigToLittleEndian(bigEndianArr);
console.log('元に戻した後');
for (const x of littleEndianArr) {
  console.log('0x' + x.toString(16));
}