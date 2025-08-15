export function counterGroup() {
    let counters = []; //全てのカウンターをここに保持する

    function newCounter() {
        let n = 0;
        const countObj = {
            count() { return n++; },  // 値を増やす
            reset() { n = 0; },       // リセット
            value() { return n; }     // 現在値を返すだけ
        }
        counters.push(countObj); //新しいカウンターをcountersに追加
        return countObj; //カウンターオブジェクトを返す
    }

    // 全てのカウンターの値を合計する
    //ここでcounter.count()にするとカウントされてしまうため、newCounter()で作成したvalueを使うようにした
    function total() {
        return counters.reduce((sum, counter) => sum + counter.value(), 0);
    }

    function average() {
        // countersが空の場合は例外を投げる
        if (counters.length === 0) {
            throw new TypeError("No counters available");
        }
        return total() / counters.length;
    }

    function variance() {
        // countersが2つ以上じゃないと例外を投げる
        if (counters.length < 2) {
            throw new TypeError("No counters available");
        }
        const avg = average();
        const sumOfSquares = counters.reduce((sum, counter) => {
            const count = counter.value();
            return sum + Math.pow(count - avg, 2);
        }, 0);
        return sumOfSquares / counters.length;

    }

    return {
        newCounter,
        total,
        average,
        variance
    };
}

const cg1 = counterGroup();
const counter = cg1.newCounter();
console.log(counter.count()); // 0
console.log(counter.count()); // 1
console.log(counter.count()); // 2
// counter.reset();
// console.log(counter.count()); // 0
console.log(cg1.total()); // 3
const cg2 = counterGroup();
const counter2 = cg2.newCounter();
console.log(counter2.count()); // 0
console.log(counter2.count()); // 1
console.log(cg2.total()); // 2