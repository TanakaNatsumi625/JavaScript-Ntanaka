```js
function f(input) {
  const f = new Function(`return "Hello, " + ${input}`);
  console.log(f());
}
```
## このコードの問題点
- `input`には任意の文字が入るようになっており、もしJSのコードがinputされてしまうとインジェクション攻撃されてしまう可能性がある。Helloという文字列と、実行するコードを返す関数になる。
```js
//イメージ
function f(input) {
  const f = () =>{
    return "Hello, " + ${input}
  }
  console.log(f());
}
```
なので例えばユーザー名とかを全て出力することができてしまう場合もある(index.jsへ)
Webアプリを開発する際、ユーザーが入力する欄を作る時は注意が必要だと思った