import { isValue } from "./index.js";

describe("isValue", () => {
    it("returns true when 0.3-0.2 and 0.1 are given", () => {
        expect(isValue(0.3 - 0.2, 0.1)).toBe(true);
    });
    
    it("returns true when 0.2-0.1 and 0.2 are given", () => {
        expect(isValue(0.2 - 0.1, 0.1)).toBe(true);
    });
});