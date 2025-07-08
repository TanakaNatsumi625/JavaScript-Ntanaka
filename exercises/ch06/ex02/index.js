let user = {
    name: "tanaka",
    age: 20,
    func1() {
        return `name: ${this.name}, age: ${this.age}`;
    }
}
//Object.create()は、指定したオブジェクトをプロトタイプに持つ新しいオブジェクトを作成する   
let user2 = Object.create(user); // userをプロトタイプに持つuser2を作成
user2.name = "suzuki"; // user2のnameプロパティを上書き
user2.age = 30; // user2のageプロパティを上書き
// user2はuserのプロトタイプを持つため、userのメソッドを継承している(func1()を呼び出せる)
console.log(user2); // { name: 'suzuki', age: 30 }
console.log(user2.func1()); // name: suzuki, age: 30  ⇒ user2はfunc1()を持っていないが、userのfunc1()を継承していることがわかる

//Object.getPrototypeOf()は、指定したオブジェクトのプロトタイプを取得する
console.log(Object.getPrototypeOf(user2) === user); // true 

//メモ
//参考：https://jsprimer.net/basic/prototype-object/
//prototypeはオブジェクトのプロパティであり、全てのオブジェクトに継承される(オブジェクトの大元的な存在)
//toString()やvalueOf()などのメソッドは、Object.prototypeに定義されていて、プロトタイプメソッドと呼ばれる
