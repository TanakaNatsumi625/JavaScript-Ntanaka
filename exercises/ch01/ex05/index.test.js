import { abs, sum, factorial } from "./index.js";

// TypeScript の場合は以下:
// import { abs, sum, factorial } from "./index.ts";

describe("math", () => {
  describe("abs", () => {
    it("returns same value when positive value given", () => {
      expect(abs(42)).toBe(42);
    });

    it("returns negated value when negative value given", () => {
      expect(abs(-42)).toBe(42);
    });

    it("returns zero value when zero given", () => {
      expect(abs(0)).toBe(0);
    });
  });

  // 以下に sum, factorial のテストを記載せよ
  describe("sum", () => {
    it("return sum value when two values given", () => {      
      expect(sum(1, 2)).toBe(3);
      expect(sum(3, 4)).toBe(7);
      expect(sum(-5, 6)).toBe(1);
      expect(sum(0, 0)).toBe(0);
      expect(sum(-1, -2)).toBe(-3);
    });
  });
  describe("factorial", () => {
    it("returns 1 when 0 given", () => {
      expect(factorial(0)).toBe(1);
    });
    it("returns 3 when 3*(3-1)! given", () => {
      expect(factorial(3)).toBe(6);
    });
  });
});
