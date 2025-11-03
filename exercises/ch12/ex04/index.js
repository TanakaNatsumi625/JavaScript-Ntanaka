//`filter()` 関数と整数列を返すジェネレータを組み合わせる
function filter(iterable, predicate) {
    let iterator = iterable[Symbol.iterator]();
    return { // このオブジェクトはイテレータであり、反復可能でもある。
        [Symbol.iterator]() { return this; },
        next() {
            for (; ;) {
                let v = iterator.next();
                if (v.done || predicate(v.value)) {
                    return v;
                }
            }
        }
    };
}

//整数列を返すジェネレータ
function* integers(start) {
    let i = start;
    while (true) {
        yield i++;
    }
}

//呼び出しごとに素数を順番に返す無限ジェネレータ
export function* primes() {
    let start = 2;
    let iter = integers(start);//2から始まる整数列
    for (; ;) {
        let prime = iter.next().value;//次の素数
        yield prime;//素数を返す
        //次の素数を見つけるために、現在の素数で割り切れない数だけを通すフィルタを作成
        iter = filter(iter, n => n % prime !== 0);
    }
}

//以下、動作確認コード
const primeIter = primes();
for (let i = 0; i < 10; i++) {
    console.log(primeIter.next().value);
}