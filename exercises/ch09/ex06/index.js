//コンポジション＝小さな機能を組み合わせて作る
//キーと値の型をチェックするクラスを作る
//参考：./TypeOf.js
export class TypedMap {
    // 初期化処理では、委譲先となるMap オブジェクトを生成する。
    //型定義も初期化する
    constructor(keyType, valueType, entries) { 
        this.map = new Map();
        this.keyType = keyType;
        this.valueType = valueType;
        // entries が指定されている場合、型をチェックしながら、Map オブジェクトに追加する。
        if(entries){
            for(let [k, v] of entries){
                this.set(k, v); //setメソッドで型チェックしながら追加
            }
        }
    }
    // Map オブジェクトの set プロパティを返す。
    set(key, value){
        // key やvalue の型が異なっている場合は、エラーをスローする。
        if (this.keyType && typeof key !== this.keyType) {
            throw new TypeError(`${key} is not of type ${this.keyType}`);
        }
        if (this.valueType && typeof value !== this.valueType) {
            throw new TypeError(`${value} is not of type ${this.valueType}`);
        }
        //型が正しい場合はMapに追加
        return this.map.set(key, value);
    }

}

//動作確認
const tm = new TypedMap("string", "number", [["one", 1], ["two", 2]]);
console.log(tm.map.get("one")); // 1
tm.set("three", 3);
console.log(tm.map.get("three")); // 3
// tm.set("four", "4"); // TypeError: 4 is not of type number

// const tm2 = new TypedMap("string", "number", [["one", "1"], ["two", 2]]);
// console.log(tm2.map.get("one")); //  TypeError: 1 is not of type number