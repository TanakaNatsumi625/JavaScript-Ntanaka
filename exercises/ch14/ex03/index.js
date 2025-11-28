export class IgnoreAccentPattern {
    constructor(pattern) {
        if (typeof pattern === 'string') {
            //文字列の場合、アクセントを除去して正規表現を作成
            const normalizedPattern = pattern.normalize("NFD").replace(/[\u0300-\u036f]/, "");
            this.pattern = new RegExp(normalizedPattern);
        } else if (pattern instanceof RegExp) {
            //正規表現の場合、パターン文字列をアクセント除去して新しい正規表現を作成
            const normalizedPattern = pattern.source.normalize("NFD").replace(/[\u0300-\u036f]/, "");
            const flags = pattern.flags;
            this.pattern = new RegExp(normalizedPattern, flags);
        }
    }
    [Symbol.search](str) {
        //文字列を正規化し、アクセントの範囲を取り除く(“”に置き換え)
        const normalizedStr = str.normalize("NFD").replace(/[\u0300-\u036f]/, "");
        return normalizedStr.search(this.pattern);
    }
    [Symbol.match](str) {
        const normalizedStr = str.normalize("NFD").replace(/[\u0300-\u036f]/, "");
       return normalizedStr.match(this.pattern);

    }
}

//動作確認
//searchの確認
const str = "Coffee Café";
console.log(str.search(new IgnoreAccentPattern("Cafe"))); // 7
console.log(str.search(new IgnoreAccentPattern("Café"))); // 7
console.log(str.search(new IgnoreAccentPattern(/Café/))); // 7
console.log(str.search(new IgnoreAccentPattern(/Cafe/))); // 7
console.log(str.search(new IgnoreAccentPattern("café"))); // -1
//matchの確認
console.log(str.match(new IgnoreAccentPattern("Cafe"))); // [ 'Cafe' ]
console.log(str.match(new IgnoreAccentPattern(/Cafe/g))); // [ 'Cafe' ]
console.log(str.match(new IgnoreAccentPattern(/Café/g))); // [ 'Cafe' ]
console.log(str.match(new IgnoreAccentPattern(/[a-e]/g))); // [ 'e', 'e', 'a', 'e' ]
console.log(str.match(new IgnoreAccentPattern(/é/g))); // [ 'e', 'e', 'e' ]
console.log(str.match(new IgnoreAccentPattern("café"))); // null

const pattern1 = new IgnoreAccentPattern("Cafe");
const result1 = str.match(pattern1);
console.log("文字列パターン result:", result1);
console.log("typeof result:", typeof result1);
console.log("Array.isArray(result):", Array.isArray(result1));
console.log("result properties:", Object.getOwnPropertyNames(result1));

//memo
// String.prototype.match() は、正規表現に g フラグが付いているかどうかで返り値の「形」が変わる
// gなし =>RegExpMatchArray (index や input といった追加のプロパティを持つ特別なオブジェクト)
// gあり => ただの配列

// "Coffee Cafe".match(/Cafe/);
// // => ["Cafe"] かつ { index: 7, input: "Coffee Cafe", ... } を持つ

// "Coffee Cafe".match(/Cafe/g);
// // => ["Cafe"] だけ（indexなどの追加プロパティはない）

// toStrictEqualは中身だけではなく構造も比べる
// ので、5行目でgを付けて正規表現を作成していたため、返り値はただの配列だった
// しかしJESTでは.match()の返り値はRegExpMatchArrayとして扱われるため、追加プロパティを持つオブジェクトとなり、構造が異なるためテストが失敗していた



