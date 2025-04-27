import { fib } from "./index.js";

// TypeScript の場合は以下:
// import { abs, sum, factorial } from "./index.ts";

describe("math", () => {
  describe("fib", () => {
    it("returns fibonacci value = 5 when positive value = 5 given", () => {
      expect(fib(5)).toBe(5);
    });

    it("returns fibonacci value= 2111485077978050 when value = 75 given", () => {
      expect(fib(75)).toBe(2111485077978050);
    });
  });
});
