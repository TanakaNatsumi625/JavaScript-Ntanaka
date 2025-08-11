import { squaredWithRecursion, squaredWithLoop, powIterative } from "./index.js";

describe("べき乗のテスト", () => {
    test("再帰を使ったべき乗の計算", () => {
        expect(squaredWithRecursion(2, 3)).toBe(8);
        expect(squaredWithRecursion(5, 0)).toBe(1);
        //例外テストをしたい場合はexpect(() => 関数呼び出し).toThrow();
        expect(() => squaredWithRecursion(2, -1)).toThrow("負の累乗は未対応です");
        expect(squaredWithRecursion(0, 3)).toBe(0);
    });

    test("ループを使ったべき乗の計算", () => {
        expect(squaredWithLoop(2, 3).result).toBe(8);
        expect(squaredWithLoop(2, 3).calcCount).toBe(3);
        expect(squaredWithLoop(5, 0).result).toBe(1);
        expect(squaredWithLoop(0, 2).result).toBe(0);
        expect(() => squaredWithLoop(2, -1)).toThrow("負の累乗は未対応です");
    });

    test("効率的なべき乗計算", () => {
        expect(powIterative(2, 10).result).toBe(1024);
        expect(powIterative(5, 0).result).toBe(1);
        expect(powIterative(0, 2).result).toBe(0);
        expect(() => powIterative(2, -1)).toThrow("負の累乗は未対応です");
    });
});