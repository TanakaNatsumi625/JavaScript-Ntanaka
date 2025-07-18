export function restrict(target, template){
    for(let key of Object.keys(target)){
        if(!Object.prototype.hasOwnProperty.call(template, key)){
            delete target[key];
    }
    }
    return target;
}

console.log(restrict({}, {}))//,expected: {} 
console.log(restrict({}, { a: {}, 1: [], [Symbol("test")]: 3 }))//,expected: {}
const parent = { parent: "parent" };
console.log(restrict(parent, Object.create(parent)))//expected: {}
console.log(Object.create(parent))//,expected: { parent: "parent" }

export function substract(target, ...sources){
    for(const source of sources){
        for(const key of Object.keys(source)){
            if(key in target){
                delete target[key];
            }
        }
    }
    return target;
}

console.log(substract({}, {}))//,expected: {}
console.log(substract({}, { a: {}, 1: [], [Symbol("test")]: 3 }))//,expected: {}

//memo
//以下はうまくいかない
//比較したいtemplateが{}の時、targetのプロパティを削除せずに終わってしまう
// export function restrict(target, template){
//     for(let key of Object.keys(template)){
//         if(!(key in target)){
//             delete target[key];
//     }
//     }
//     return target;
// }
//また、(key in target)のようにin演算子を使うと、templateをObject.create(parent)のようにしたとき失敗する
//in演算子は、プロトタイプチェーンも含めてチェックするため、targetに存在しないプロパティがtemplateのプロトタイプにあった場合、削除されない。
//つまりparentはtemplateに「ある」扱いになる