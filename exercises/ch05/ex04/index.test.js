import { fibonacciDoWhile } from "./index.js";
import { fibonacciFor } from "./index.js";
import { fibonacciWhile } from "./index.js";

describe("Fibonacci Functions", () => {
    it("should return 10 Fibonacci sequence using while loop", () => {
        const expected = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
        expect(fibonacciWhile()).toEqual(expected);
    });
    it("should return 10 Fibonacci sequence using do-while loop", () => {
        const expected = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
        expect(fibonacciDoWhile()).toEqual(expected);
    });
    it("should return 10 Fibonacci sequence using for loop", () => {
        const expected = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
        expect(fibonacciFor()).toEqual(expected);
    });

});