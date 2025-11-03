import { primes } from "./index.js";

describe("primes", () => {
    // 10個の素数を返すことを確認するテスト
    it("should return the first 10 prime numbers", () => {
        const primeIter = primes();
        const result = [];
        for (let i = 0; i < 10; i++) {
            result.push(primeIter.next().value);
        }
        expect(result).toEqual([2, 3, 5, 7, 11, 13, 17, 19, 23, 29]);
    });
    // 次の素数が前の素数の後に生成されることを確認するテスト
    it('generates next prime after previous ones', () => {
        const it = primes();
        it.next(); // 2
        it.next(); // 3
        it.next(); // 5
        const next = it.next().value; // 7
        expect(next).toBe(7);
    });
    // 既知の素数の倍数が返されないことを確認するテスト
    it('does not return multiples of known primes', () => {
        const it = primes();
        const primesList = [];
        for (let i = 0; i < 10; i++) {
            primesList.push(it.next().value);
        }
        primesList.forEach((p, idx) => {
            for (let j = 0; j < idx; j++) {
                expect(p % primesList[j]).not.toBe(0);
            }
        });
    });
});
