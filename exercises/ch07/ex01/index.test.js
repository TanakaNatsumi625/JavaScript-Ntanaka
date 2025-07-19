import { addMatrices, multiplyMatrices } from "./index.js";

describe('addMatrices', () => {
    it('二次元配列の加算', () => {
        expect(addMatrices([[1, 2], [3, 4]], [[5, 6], [7, 8]])).toEqual([[6, 8], [10, 12]]);
    });
    it('行列のサイズが一致しない場合', () => {
        expect(addMatrices([[1, 2], [4, 5]], [[7, 8, 9]])).toBe("行列のサイズが一致しません。");
    });
});
describe('multiplyMatrices', () => {
    it('二次元配列の乗算', () => {
        expect(multiplyMatrices([[1, 2], [3, 4]], [[5, 6], [7, 8]])).toEqual([[19, 22], [43, 50]]);
    });
    it('行列のサイズが一致しない場合', () => {
        expect(multiplyMatrices([[1, 2], [4, 5]], [[7, 8, 9]])).toBe("行列のサイズが一致しません。");
    });
});
