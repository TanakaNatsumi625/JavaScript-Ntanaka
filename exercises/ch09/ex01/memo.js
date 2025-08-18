// 新しいrange オブジェクトを返すファクトリ関数。
//プロパティやメソッドを、r.fromやrange.methods{}のように、ドット記法でアクセスできるようにするために、オブジェクトを生成する。
function range(from, to) {
    // Object.create() 関数を使って、プロトタイプオブジェクト（この後で定義）を継承するオブジェクトを生成する。
    //プロトタイプオブジェクトは、この関数のプロパティに保存する。すべてのrange オブジェクトで共有するメソッド（振る舞い）を定義する。
    let r = Object.create(range.methods);
    // 新しいrange オブジェクトの始端と終端を保存する。
    // この2 つのプロパティは継承したものではない。オブジェクトに一意なもの。
    r.from = from;
    r.to = to;
    // 最後に、新しいオブジェクトを返す。
    return r;
}

// このプロトタイプオブジェクトで定義したメソッドは全range オブジェクトで継承される。
range.methods = {
    // x が範囲内であればtrue を返し、範囲外であればfalse を返す。
    // このメソッドは数値だけでなく、文字列やDate オブジェクトでも動作する。
    includes(x) { return this.from <= x && x <= this.to; },
    // クラスのインスタンスを反復可能にする(インスタンスをforとか使えるようにする)ジェネレータ関数。
    // このメソッドは数値の範囲に対してしか動作しない。
    *[Symbol.iterator]() {
        for (let x = Math.ceil(this.from); x <= this.to; x++) yield x;
    },
    // range オブジェクトの文字列表現を返す。
    toString() { return "(" + this.from + "..." + this.to + ")"; }
};
// range オブジェクトの使用例。
let r = range(1, 3); // 新しいrange オブジェクトを生成する。
console.log(r.includes(2)) // => true: 2 は範囲内。
console.log(r.toString) // => "(1...3)"
console.log([...r]); // => [1, 2, 3]; イテレータを使って配列に変換する。

//コンストラクタを定義して、new 演算子を使ってrange オブジェクトを生成することもできる(オブジェクトを生成したりする必要がない)。
// 新しいRange オブジェクトを初期化するコンストラクタ関数。
// オブジェクトを生成したり返したりせず、this を初期化しているだけ。
function Range(from, to) {
    // 新しいRange オブジェクトの始端と終端を保存する。
    // この2 つのプロパティは継承したものではない。オブジェクトに一意なもの。
    this.from = from;
    this.to = to;
}
// 全Range オブジェクトが、このオブジェクトを継承する。
// この例の場合は、プロパティ名は「prototype」でなければならない。
Range.prototype = {
    // x が範囲内であればtrue を返し、範囲外であればfalse を返す。
    // このメソッドは数値だけでなく、文字列やDate オブジェクトでも動作する。
    includes: function (x) { return this.from <= x && x <= this.to; },
    // クラスのインスタンスを反復可能にするジェネレータ関数。
    // このメソッドは数値の範囲に対してしか動作しない。
    [Symbol.iterator]: function* () {
        for (let x = Math.ceil(this.from); x <= this.to; x++) yield x;
    },
    // range オブジェクトの文字列表現を返す。
    toString: function () { return "(" + this.from + "..." + this.to + ")"; }
};
// 新しいRange クラスの使用例。
let r1 = new Range(1, 3); // Range オブジェクトを生成する。new を使っていることに注意。
console.log(r1.includes(2)) // => true: 2 は範囲内。
console.log(r1.toString) // => "(1...3)"
console.log([...r1]); // => [1, 2, 3]; イテレータを使って配列に変換する。