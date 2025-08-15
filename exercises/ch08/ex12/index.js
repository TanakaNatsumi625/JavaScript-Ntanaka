export const f = (str) => {
    const args = [];
    for (let i = 1; i <= 10; i++) {
        //args = ["$1", "$2", ..., "$10"]になる
        //引数は `$1`, `$2`, ... のように記載し、 `$10` までサポートするので。
        args.push(`$${i}`);
    }
    //関数の本体は、文字列の中に `$1`, `$2`, ... のように記載する
    //未指定の場合はそのまま文字列で返す
    //trim(): 前後の空白を削除する。
    //startsWith(): 指定した文字列で始まるかどうか(テスト4個目のため)
    const body = str.trim().startsWith("{") ? str : `return ${str};`;
    return new Function(...args, body); // 新しい関数を生成
}

//f()()の書き方
//f():引数を渡して上で作った関数を呼び出す。戻り値はnew Functionで生成された関数
//二つ目の()は、生成された関数を実行するためのもの。書いてある順に...argsの中に割り当てられる
console.log(f("42")()); // 42
console.log(f("$1 + 1")(1)); // 2。→function($1,$2,...,$10){ return $1 + 1; }
console.log(f("$1 + $2 + $3 + $4 + $5 + $6 + $7 + $8 + $9 + $10")(
    "1",
        "2",
        "Fizz",
        "4",
        "Buzz",
        "Fizz",
        "7",
        "8",
        "Fizz",
        "Buzz"
      ));//12Fizz4BuzzFizz78FizzBuzz
//新たにコードを割り当てることも可能
console.log(f("{ const result = $1 + $2;\n return result; }")(1, 2)); // 3