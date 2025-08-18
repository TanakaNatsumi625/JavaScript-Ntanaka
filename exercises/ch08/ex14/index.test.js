import { any, catching } from "./index.js";

describe("any", () => {
    it("should return true if any function returns true", () => {
        const isNonZero = any(
        (n) => n > 0,
        (n) => n < 0
        );
    
        expect(isNonZero(0)).toBe(false);
        expect(isNonZero(42)).toBe(true);
        expect(isNonZero(-0.5)).toBe(true);
    });
    });
describe("catching", () => {
    const safeJsonParse = catching(JSON.parse, (e) => {
        return { error: e.toString() };
      });
    it("should return parsed JSON object for valid JSON", () => {
        expect(safeJsonParse('{"a": 1}')).toEqual({ a: 1 });
    })
    it("should return error object for invalid JSON", () => {
        expect(safeJsonParse("{Invalid Json}")).toEqual({ error: "SyntaxError: Expected property name or '}' in JSON at position 1" });
    });
});
