export class HiraganaChar {
    constructor(char) {
        this.char = char;
        this.code = char.charCodeAt(0);
    }
    [Symbol.toPrimitive](hint) {
        if (hint === 'string') {
            // 文字列が期待されている場合
            return this.char;
        } else if (hint === 'number') {
            // 数値が期待されている＝算術演算子が使われている場合
            return this.code;
        }
        // デフォルトの処理
        return this.char;
        }
}

//動作確認
let a = new HiraganaChar('あ');
let b = new HiraganaChar('い');
console.log(`${a}${b}`);
console.log(a<b)
console.log(+a)