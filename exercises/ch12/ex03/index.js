export function* countUpTo() {
    let count = 0;
    while (true) {
        try {
            // 現在のカウント値を返す（yieldで外部に出す）
            yield count++;
        } catch (e) {
            console.log("エラー発生: ", e);
            count = 0;
            console.log("カウンターをリセットしました");
            yield count;

        }
    }
}

//returnやnext以外にもthrowで外部から例外を送ることができる
function* outer() {
    yield* countUpTo();
}

const gen = outer();

console.log(gen.next().value); // → 0
console.log(gen.next().value); // → 1
console.log(gen.next().value); // → 2

// ここでカウンタをリセット
gen.throw(new Error("reset")); // catchに入ってcount=0になる

console.log(gen.next().value); // → 0
console.log(gen.next().value); // → 1
