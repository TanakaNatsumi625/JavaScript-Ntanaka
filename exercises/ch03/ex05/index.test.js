import { convertCrLf } from "./index.js";
import { convertLf } from "./index.js"; 

describe("convertLf", () => {
    it("success convert LF to CRLF", () => {
        const input = "Hello\nworld\nHello\nworld";
        const expectedOutput = "Hello\r\nworld\r\nHello\r\nworld";
        expect(convertLf(input)).toBe(expectedOutput);
    });

    it("should not modify strings without LF", () => {
        const input = "Hello world";
        const expectedOutput = "Hello world";
        expect(convertLf(input)).toBe(expectedOutput);
    });
});
describe("convertCrLf", () => {
    it("success convert CRLF to LF", () => {
        const input = "Hello\r\nworld\r\nHello\r\nworld";
        const expectedOutput = "Hello\nworld\nHello\nworld";
        expect(convertCrLf(input)).toBe(expectedOutput);
    });

    it("should not modify strings without CRLF", () => {
        const input = "Hello world";
        const expectedOutput = "Hello world";
        expect(convertCrLf(input)).toBe(expectedOutput);
    });
});