import { sequenceToObject } from "./index.js";

describe("sequenceToObject", () => {
    test(`可変長引数を受け取り、オブジェクトを返す`, () => {
        expect(sequenceToObject("a", 1, "b", 2, "city", "Tokyo")).toEqual({
            a: 1,
            b: 2,
            city: "Tokyo"
        });
    });
    test(`値の個数が偶数でなければ例外を発生させる`, () => {
        expect(() => sequenceToObject("a", 1, "b")).toThrow("値の個数は偶数でなければなりません");
    });
    test(`奇数番の値が文字列でなければ例外を発生させる`, () => {
        expect(() => sequenceToObject({a:1, b: 2}, "value", "b", 2)).toThrow("奇数番の値は文字列でなければなりません");
    });
});

//結果
// sequenceToObject
// √ 可変長引数を受け取り、オブジェクトを返す (1 ms)                                                                                                                                                                                      
// √ 値の個数が偶数でなければ例外を発生させる (5 ms)                                                                                                                                                                                      
// √ 奇数番の値が文字列でなければ例外を発生させる (1 ms)                                                                                                                                                                                  
                                                                                                                                                                                                                                       
// Test Suites: 1 passed, 1 total                                                                                                                                                                                                             
// Tests:       3 passed, 3 total   