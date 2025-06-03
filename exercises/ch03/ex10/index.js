//参考：https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Symbol

//Symbol()は識別子を生成する関数。引数は識別子の説明(ラベル)
//名前が同じでも鍵の形が異なる(呼び出されるたびに変わるから)
//idやkey,tokenを生成するのに使われる
let sym1 = Symbol('sym1');
let sym2 = Symbol('sym1');

//オブジェクト作成
//[sym1]の書き方は、sym1に入っている値をキーとして使っている書き方。変数や式として評価される
//sym1: 'value1'と書くと、文字列として評価される
let obj = {
    [sym1]: 'value1',
    [sym2]: 'value2'
}

console.log(obj[sym1]=== obj[sym2]); // false

//オブジェクトに対して、作成した`Symbol`変数を使って各プロパティの値を取得
console.log(obj[sym1]); // value1
console.log(obj[sym2]); // value2

//`Symbol.for()`で同名の変数を作成した場合の挙動を確認
// `Symbol.for()`はグローバルなシンボルレジストリを使用して、同じ名前のシンボルを再利用する
//グローバルシンボルレジストリー内の共有シンボルとはプログラム全体で共有できるSymbolを保存しておく場所
let sym3 = Symbol.for('sym1');
let sym4 = Symbol.for('sym1');

console.log(sym3 === sym4); // true


