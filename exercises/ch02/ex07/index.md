プログラムを実行し、挙動を確認しなさい。
以下のように出力された
0 1 0
1 1 0

メモ
prettier-ignoreはフォーマッタで成形させないようにするもの
const c
=
a
// prettier-ignore
++
b
は以下のように解釈される
const c=a //c=a=0
++b //bが1に増える
よって、console.log(a, b, c)は0 1 0と出力される

const e = a++
b;

console.log(a, b, e);
は以下のように解釈される
const e = a++; //aに1追加される
b;
よってconsole.log(a, b, e)は1 1 0と出力される