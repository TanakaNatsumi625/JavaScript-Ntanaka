import { output, squared, getCurrentTime1, getCurrentTime2 } from "./index.js";

describe("Arrow Function Tests", () => {
    test("output function", () => {
        const result = output(3, 'Hello');
        expect(result).toEqual(['Hello', 'Hello', 'Hello']);
    });

    test("squared function", () => {
        const result = squared(5);
        expect(result).toBe(25);
    });

    test("getCurrentTime1 function", () => {
        const result = getCurrentTime1();
        expect(result).toHaveProperty('now');
        expect(result.now).toBeInstanceOf(Date);
    });
    test("getCurrentTime2 function ", () => {
        const result = getCurrentTime2();
        expect(result).toHaveProperty('now');
        expect(result.now).toBeInstanceOf(Date);
    });
});

//テスト結果
// √ output function (9 ms)
// √ squared function
// √ getCurrentTime1 function (1 ms)
// √ getCurrentTime2 function
// Test Suites: 1 passed, 1 total
// Tests:       4 passed, 4 total