import { template } from "./index.js";

describe("template関数のテスト", () => {
    test("空のテンプレートリテラル", () => {
        expect(template``).toBe('""');
    });
    test("値を含まないテンプレートリテラル", () => {
        expect(template`test`).toBe("test");
    });
    test("文字列を埋め込む", () => {
        expect(template`Hello, ${"A"}`).toBe("Hello, string");
    });
    test("複数の異なる型を埋め込む", () => {
        expect(template`${1} ${null} ${() => {}}`).toBe("number object function");
    });
    test("テンプレートの前後に文字列がある場合", () => {
        expect(template`type of 'A' is ${"A"}`).toBe("type of 'A' is string");
    });
});