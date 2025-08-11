export function sequenceToObject(...values){
    // 値の個数が偶数で無ければ例外を発生させる
    if (values.length % 2 !== 0) {
        throw new Error("値の個数は偶数でなければなりません");
    }
    const result = {};
    
    for (let i = 0; i < values.length; i += 2) {
        //　奇数番号の値をキー、偶数番号の値を値としてオブジェクトに追加
        const key = values[i]; //引数のi番目の値がキー。奇数番目になる
        const value = values[i + 1]; //引数のi+1番目の値が値。偶数番目になる
        // 奇数番の値が文字列で無ければ例外を発生させる
        if (typeof key !== 'string') {
        throw new Error("奇数番の値は文字列でなければなりません");
        }
        //keyとvalueをresultオブジェクトに追加
        result[key] = value; //key番目の値がvalue
    }
    
    return result;
}

// 動作確認
console.log(sequenceToObject("name", "Alice", "age", 30, "city", "Tokyo"));// 出力結果: { name: 'Alice', age: 30, city: 'Tokyo' }
console.log(sequenceToObject("a", 1, "b", 2)); // 出力結果: { a: 1, b: 2 }
