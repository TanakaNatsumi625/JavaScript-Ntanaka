export class C {
    constructor() {
        this.n = 0;
    }
    
    get x() {
        return this.n++;
    }
}

const c = new C();
console.log(c.n); // 0
console.log(c.x); 
console.log(c.x);

//値を読み出す＝ getter
// 通常のフィールドは値の入れ物→this.x =0みたいな
// ただのメソッドはc.x()のように呼び出さないといけない
//getterはc.xのように呼び出せる
//getter, setterのようなアクセサプロパティを読み出すと、引数なしで呼び出せる。メソッドの返り値がプロパティアクセス式の値