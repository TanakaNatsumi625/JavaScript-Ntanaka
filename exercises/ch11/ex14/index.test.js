import { sortJapanese, toJapaneseDateString } from "./index.js";

describe('sortJapanese', () => {
    test('should sort Japanese strings correctly', () => {
        const input = ['カ', 'つ', 'あ', 'っ', 'ア', 'イ', 'が', 'ぴ'];
        const expected = ['あ', 'ア', 'イ', 'カ', 'が', 'つ', 'っ', 'ぴ'];
        console.log(sortJapanese(input));
        expect(sortJapanese(input)).toEqual(expected);
    });
});

describe('toJapaneseDateString', () => {
    test('should throw error for invalid date', () => {
        expect(() => toJapaneseDateString('invalid date')).toThrow('Dateオブジェクトを渡してください');
        expect(() => toJapaneseDateString(new Date('invalid date'))).toThrow('Dateオブジェクトを渡してください');
    });
    test('should handle edge cases around era changes', () => {
        expect(toJapaneseDateString(new Date('2019-05-01'))).toBe('令和1年5月1日');
        expect(toJapaneseDateString(new Date('2019-04-30'))).toBe('平成31年4月30日');
        expect(toJapaneseDateString(new Date('1989-01-08'))).toBe('平成1年1月8日');
        expect(toJapaneseDateString(new Date('1989-01-07'))).toBe('昭和64年1月7日');
    });
});