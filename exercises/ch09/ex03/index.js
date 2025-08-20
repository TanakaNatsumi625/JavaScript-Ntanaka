//確認
class C {
    x = 42;

    get X() {
        return this.x;
    }
}
const c = new C();
console.log(c.x); // 42→外部から直接アクセスできる

//`x` をプライベートフィールドにすることで、外部から `x` にアクセスできないようにする
class C1 {
    #x = 42;

    get X() {
        return this.#x;
    }
}
const c1 = new C1();
console.log(c1.x); // undefined→外部から直接アクセスできない
console.log(c1.X); // 42→getX()を通してアクセスできる

class C2{

    X() {
        this.x = 42;
        return this.x;
    }
}
const c2 = new C2();
console.log(c2.x); // undefined→外部から直接アクセスできない
console.log(c2.X()); // 42→メソッドを通してアクセスできる

//テスト用にエクスポート
export { C, C1, C2 };