import { bitCount } from './index.js';

describe('index.js', () => {
    it('bitnumber= 0b111の時、1のビット数は3', () => {
        expect(bitCount(0b111)).toBe(3);
    });
    it('bitnumber= 0b1111111111111111111111111111111の時、1のビット数は31', () => {
        expect(bitCount(0b1111111111111111111111111111111)).toBe(31);
    });
    it('bitnumber= -1の時、1のビット数は32', () => {
        expect(bitCount(-1)).toBe(32);
    });
});