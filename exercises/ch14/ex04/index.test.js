import { HiraganaChar } from "./index.js";

describe("HiraganaChar", () => {
    test("文字列が期待されている場合", () => {
        const a = new HiraganaChar('あ');
        const b = new HiraganaChar('い');
        expect(`${a}${b}`).toBe('あい');
    });

    test("数値が期待されている場合", () => {
        const a = new HiraganaChar('あ'); // code: 12354
        expect(+a).toBe(12354);
    });
    test("比較・ソートのテスト", () => {
        const arr = [new HiraganaChar("う"), new HiraganaChar("あ"), new HiraganaChar("い")];
        arr.sort((x, y) => x - y); // UTF-16 コード順で並ぶ
        expect(arr.map(c => c.char)).toStrictEqual(["あ", "い", "う"]);
    });
});
