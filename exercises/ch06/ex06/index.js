// 任意のオブジェクトを受け取り、そのオブジェクトのすべての独自プロパティ（列挙不可、プロパティ名が `Symbol` のものを含む）および列挙可能な継承プロパティのプロパティ名の配列を返す関数を作成しなさい。
// 継承プロパティのプロパティ名については `Symbol` のものは必須とはしない。

export function getPropertyNameList(obj){
    let propertyNames = [];

    // 独自プロパティを取得
    for (let key of Object.getOwnPropertyNames(obj)) {
        propertyNames.push(key);
    }

    // 列挙可能な継承プロパティを取得
    for (let key in obj) {
        if (!propertyNames.includes(key)) {
            propertyNames.push(key);
        }
    }

    return propertyNames;
}

// テスト
let testObj = {
    1: 'one',
    str: 'hello',
    enum: 'enumerable',
    Symbol: Symbol('symbolProperty')
};
console.log(getPropertyNameList(testObj));
//出力結果
// [ '1', 'str', 'enum' ]
//列挙不可能なプロパティ追加
Object.defineProperty(testObj, 'enum2', {
    value: 'notEnumerable',
    enumerable: false,
});
console.log(getPropertyNameList(testObj));
//出力結果
// [ '1', 'str', 'enum', 'enum2' ]
