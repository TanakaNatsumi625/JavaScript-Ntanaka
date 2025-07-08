let o = {};
Object.defineProperty(o, 'x', {
    value: 1,
    writable: false,
    enumerable: false,
    configurable: true
});

//hasOwnProperty: 指定した名前の独自プロパティを持つかテストする
//o = { x: 1 };で独自プロパティなのでtrueになる
console.log(o.hasOwnProperty('x')); // true

//propertyIsEnumerable：独自プロパティかつ列挙可能かテストする
//o = { x: 1 };は独自プロパティだが、enumerableがfalseなのでfalseになる
console.log(o.propertyIsEnumerable('x')); // false

//enumerableをtrueにしてみる
Object.defineProperty(o, 'x',{
    enumerable: true
})
console.log(o.propertyIsEnumerable('x')); // true
