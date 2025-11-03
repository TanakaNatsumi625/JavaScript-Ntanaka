import { countUpTo } from "./index.js";

describe("countUpTo generator function", () => {
    let gen;
    beforeEach(() => {
        gen = countUpTo();
    });
    it("should count up to the specified number", () => {
        expect(gen.next().value).toBe(0);
        expect(gen.next().value).toBe(1);
        expect(gen.next().value).toBe(2);
    });
    it("should reset the counter when an error is thrown", () => {
        expect(gen.next().value).toBe(0);
        expect(gen.next().value).toBe(1);
        expect(gen.next().value).toBe(2);
        //ここでリセット
        gen.throw(new Error("reset"));
        expect(gen.next().value).toBe(0);
        expect(gen.next().value).toBe(1);
    });
});