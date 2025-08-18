function f(input) {
    const f = () =>{
      return "Hello, " + input;
    }
    console.log(f());
  }

// f()の実行
f("World"); // "Hello, World"

//例えば以下のようにユーザー名の情報が配列に保たれているとする
const userName = ["Alice", "Bob", "Charlie", "Dave", "Eve"];
//ユーザー名を表示する関数を作成
f(userName.map((name) => {
    return `Hello, ${name}`;
}));
//出力結果
// Hello, World
// Hello, Hello, Alice,Hello, Bob,Hello, Charlie,Hello, Dave,Hello, Eve