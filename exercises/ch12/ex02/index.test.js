import { fibonacciIterator } from "./index.js";

function fibonacciIter(n) {
    const iter = fibonacciIterator();
    const iterator = iter[Symbol.iterator]();
    let result;
    for (let i = 0; i < n; i++) {
        result = iterator.next().value;
    }
    return result;
}

describe("fibonacciIterator", () => {
    it("should return the correct Fibonacci sequence", () => {
        const testCases = [
            { n: 1, expected: 1 },
            { n: 2, expected: 2 },
            { n: 3, expected: 3 },
            { n: 4, expected: 5 },
            { n: 5, expected: 8 },
        ];
        testCases.forEach(({ n, expected }) => {
            expect(fibonacciIter(n)).toBe(expected);
        });
    });

    it("should be iterable", () => {
        const iter = fibonacciIterator();
        const results = [];
        for (let f of iter) {
            results.push(f);
            if (results.length === 6) break; // 最初の6個だけ確認
        }

        expect(results).toEqual([1, 2, 3, 5, 8, 13]);
    });
});