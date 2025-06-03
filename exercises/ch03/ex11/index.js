// const obj1 = {x: 1};
// // 問題: ここに1行コードを書くことで以下の行で {x: 1, y: 2} が出力されること
// obj1.y = 2;
// console.log(obj1);

// const obj2 = {x: 1, y: 2};
// // 問題: 以下の行では何が出力されるか、予想してから結果を確認しなさい
// // 予想：別々のオブジェクトなのでfalse
// console.log(obj1 === obj2);

export function equals(o1, o2) {
    if (o1 === o2) {
        return true; //厳密に等価ならtrue
    }
    if (typeof o1 !== 'object' || typeof o2 !== 'object' || o1 === null || o2 === null) {
        //nullはオブジェクトと等価なのでこちらも考慮する必要あり
        return false; // オブジェクト以外なら false
    }
    if (Object.keys(o1).length !== Object.keys(o2).length){
        //Object.keysはオブジェクトのプロパティ名を配列で返す
        return false; // プロパティの数が一致しなければ false
    }else{
        for (const key in o1) {
            //const key in o1 : o1のプロパティ名を順に取得
            //o2.hasOwnProperty(key) : o2にkeyが存在するか確認
            if (!o2.hasOwnProperty(key) || !equals(o1[key], o2[key])) {
                return false; // プロパティの名前が一致しなければ false
            }
        }
    }
    return true;
}

//参考：https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Working_with_objects
