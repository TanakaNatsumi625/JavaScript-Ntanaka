//プロトタイプのオブジェクト
let proto = {
    1: 'one',
    str: 'hello',
    enum: 'enumerable'
};

// Object.createを使ってプロトタイプを持つオブジェクトを作成
let obj = Object.create(proto);
//独自プロパティを追加
obj[1] = 'one-one';
obj[2] = 'two';
obj.str = 'world';
obj.str2 = 'goodbye';
//列挙不可かつプロトタイプの列挙可能プロパティと同名のプロパティ
Object.defineProperty(obj, 'enum', {
    value: 'notEnumerable',
    enumerable: false,
});

for (let key in obj) {
    // プロトタイプのプロパティも列挙される
    console.log(`${key}: ${obj[key]}`);
}

//出力結果
//objの独自プロパティが優先される⇒中でも数値プロパティが昇順⇒文字列プロパティはアルファベット順に列挙される
//プロトタイプにも同名のプロパティがある場合、独自プロパティが優先される(シャドウイング)
//よって、enumはobjでenumrableがfalseに設定されているため列挙されない
// 1: one-one
// 2: two
// str: world
// str2: goodbye