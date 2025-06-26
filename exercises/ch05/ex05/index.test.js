import { f } from "./index.js";

describe("ex05", () => {
  it("should return a new object with only even values", () => {
    const o = { x: 1, y: 2, z: 3 };
    const result = f(o);
    expect(result).toEqual({ y: 2 });
    expect(o).toEqual({ x: 1, y: 2, z: 3 }); // original object should not be modified
  });

  it("should return an empty object if no even values exist", () => {
    const o = { a: 1, b: 3, c: 5 };
    const result = f(o);
    expect(result).toEqual({});
  });

  it("should return an empty object if no values exist", () => {
    const o = {};
    const result = f(o);
    expect(result).toEqual({});
  });
});