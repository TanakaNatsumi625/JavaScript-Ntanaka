import { littleToBigEndian, bigToLittleEndian } from "./index.js";

describe('Endian Conversion', () => {
    test('littleToBigEndian converts correctly', () => {
        const littleEndianArr = new Uint32Array([0x12345678, 0xabcdef12]);
        const bigEndianArr = littleToBigEndian(littleEndianArr);
        expect(bigEndianArr).toEqual(new Uint32Array([0x78563412, 0x12efcdab]));
    });
    test('should throw error for non-Uint32Array inputs', () => {
        expect(() => littleToBigEndian([0x12345678])).toThrow(Error);
        expect(() => littleToBigEndian(new Uint16Array([0x1234]))).toThrow(Error);
    });
    test('bigToLittleEndian converts correctly', () => {
         const littleEndianArr = new Uint32Array([0x12345678, 0xabcdef12]);
        const bigEndianArr = littleToBigEndian(littleEndianArr);
        const convertedBack = bigToLittleEndian(bigEndianArr);
        expect(convertedBack).toEqual(littleEndianArr);
    });
    test('should throw error for non-Uint32Array inputs', () => {
        expect(() => bigToLittleEndian([0x12345678])).toThrow(Error);
        expect(() => bigToLittleEndian(new Uint16Array([0x1234]))).toThrow(Error);
    });
});