import { pop, push, shift, unshift, sort } from "./index.js";

describe('配列操作関数のテスト', () => {
    const seq = [1, 2, 3, 4, 5];
    it('pop関数のテスト', () => {
        expect(pop(seq)).toEqual([1, 2, 3, 4]);
        expect(pop("not an array")).toBe("配列が指定されていません");
    });
    it('push関数のテスト', () => {
        expect(push(seq, 6)).toEqual([1, 2, 3, 4, 5, 6]);
        expect(pop("not an array")).toBe("配列が指定されていません");
    });
    it('shift関数のテスト', () => {
        expect(shift(seq)).toEqual([2, 3, 4, 5]);
        expect(pop("not an array")).toBe("配列が指定されていません");
    });
    it('unshift関数のテスト', () => {
        expect(unshift(seq, 0)).toEqual([0, 1, 2, 3, 4, 5]);
        expect(pop("not an array")).toBe("配列が指定されていません");
    });
    it('sort関数のテスト', () => {
        expect(sort(seq, (a, b) => b - a)).toEqual([5, 4, 3, 2, 1]);
        expect(pop("not an array")).toBe("配列が指定されていません");
    });
    it('元の配列が変更されていないことのテスト', () => {
        expect(seq).toEqual([1, 2, 3, 4, 5]);
    });
});