//フォーマッタ―実行後

//MapはJSの標準クラス。extend＝継承
// このクラスでは、Map を拡張して、キーがマップ上に存在しないときに、
// get() メソッドがnull の代わりに指定した値を返すようにする。
class DefaultMap extends Map {
    constructor(defaultValue) {
        super(); // 親クラスのコンストラクタを呼び出す。
        this.defaultValue = defaultValue; // デフォルト値を記憶する。
    }
    get(key) {
        if (this.has(key)) { // マップ中にキーが存在すれば、
            return super.get(key); // 親クラス中の値を返す。
        }
        else {
            return this.defaultValue; // 存在しなければ、デフォルト値を返す。
        }
    }
}
// このクラスは、単語頻度ヒストグラムを計算し、表示する。
class WordHistogram {
    constructor() {
        this.wordCounts = new DefaultMap(0); // 単語数をマップする。
        this.totalWords = 0; // 全体の単語数。
    }
    // この関数は、text 中の文字でヒストグラムを更新する。
    add(text) {
        // テキストから空白文字を取りのぞき、すべての文字を小文字に変換する。
        const matches = text.toLowerCase().matchAll(/\w+|\$[\d.]+|\S+/g);
        //単語に分割する
        const words = [...matches].map((r) => r[0]);
        // テキスト中の文字をループする。
        for (let character of words) {
            let count = this.wordCounts.get(character); // 直前の値を取得する。
            this.wordCounts.set(character, count + 1); // 1 増やす。
            this.totalWords++;
        }
    }
    // ヒストグラムを文字列に変換して、ASCII グラフィックとして表示する。
    toString() {
        // マップを、[キー、単語数] 配列に変換する。[...]が返還を表すらしい→配列にすることで,.sort()や.map()など各要素への操作が可能になる
        let entries = [...this.wordCounts];
        // 単語数順にソートする。単語数が同じ場合は、アルファベット順でソートする。
        entries.sort((a, b) => { // ソート順を定義する関数。
            if (a[1] === b[1]) { // 文字数が同じ場合は、
                return a[0] < b[0] ? -1 : 1; // アルファベット順でソートする。
            } else { // 単語数が異なる場合は、
                return b[1] - a[1]; // 降順でソートする。
            }
        });
        // 文字数をパーセントに変換する。
        for (let entry of entries) {
            entry[1] = entry[1] / this.totalWords * 100;
        }
        // 出現頻度 0.5% 以上を取得
        entries = entries.filter((entry) => entry[1] >= 0.5);
        // padStart で表示幅を揃える / # の数を n ではなく 10 * n に変更
        const lines = entries.map(
            ([l, n]) =>
                `${l.padStart(10)}: ${"#".repeat(Math.round(10 * n))} ${n.toFixed(2)}%`
        );
        // 各行を改行文字で区切って結合し、結合した文字列を返す。
        return lines.join("\n");
    }
}
// このasync 関数（Promise を返す関数）は、Histogram オブジェクトを生成する。
// 標準入力からテキストを非同期に読み出し、読み出したテキストをヒストグラムに
// 追加する。テキストを最後まで読み出したら、ヒストグラムを返す。

async function histogramFromStdin() {
    process.stdin.setEncoding("utf-8"); // バイト列ではなく、Unicode 文字列を読む。
    let histogram = new WordHistogram();
    for await (let chunk of process.stdin) {
        histogram.add(chunk);
    }
    return histogram;
}
// この最後の一行がこのプログラムのメイン部分。
// 標準入力からHistogram オブジェクトを生成し、ヒストグラムを表示する。
histogramFromStdin().then(histogram => {
    console.log(histogram.toString());
});

//memo
//オーバーライド：親クラスと同じ名前のメソッドを子クラスに定義すると、子クラスのメソッドが優先して使用される。
// これは、子クラスのメソッドが親クラスのメソッドを上書きしている
//実際Mapクラスを見るとgetメソッドが定義されている
