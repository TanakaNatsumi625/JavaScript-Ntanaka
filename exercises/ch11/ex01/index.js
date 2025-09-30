export class TypeMap{

    constructor(){
        this.map = new Map();
    }

    get(key){
        //コンストラクタ関数でない場合はエラー
        if (!(this instanceof TypeMap)) {
            throw new Error('TypeMapのインスタンスではありません');
        }
        return this.map.get(key);
    }
     set(key, value) {
        // keyがコンストラクタ関数でない場合はエラー
        if (typeof key !== 'function') {
            throw new TypeError('Key must be a constructor function');
        }

        // プリミティブ値のラッパークラスの場合の特別処理
        if (key === String || key === Number || key === Boolean) {
            const primitiveType = key === String ? 'string' : 
                                 key === Number ? 'number' : 'boolean';
            if (typeof value !== primitiveType) {
                throw new TypeError(`Value must be of type ${primitiveType} for ${key.name} constructor`);
            }
        } else {
            // 一般的なクラスの場合、valueがkeyのインスタンスでない場合はエラー
            if (!(value instanceof key)) {
                throw new TypeError(`Value must be an instance of ${key.name}`);
            }
        }

        this.map.set(key, value);
    }

}
//動作確認
class Foo {}
const typeMap = new TypeMap();
console.log(typeMap.set(String, 'Hello')); 
console.log(typeMap.set(Number, 42));
console.log(typeMap.set(Foo, new Foo()));
//console.log(typeMap.set(Date, "not a date"));
console.log(typeMap.get(String));
console.log(typeMap.get(Number));