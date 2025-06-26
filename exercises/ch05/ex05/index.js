//偶数の値を持つプロパティだけを残した新しいオブジェクトを返す関数
export function f(o){
const newObject = {};
    for (const key in o) {
        if (o[key] % 2 === 0) {
            newObject[key] = o[key];
        }
    }
    return newObject;
}

// 動作確認
const o = { x: 1, y: 2, z: 3 };
console.log(f(o)); // { y: 2 }
console.log(o); // { x: 1, y: 2, z: 3 } 元のオブジェクトは変更しない