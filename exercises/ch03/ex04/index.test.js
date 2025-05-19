import { Character } from "./index.js";
import { escapeCharacter } from "./index.js";

describe("Character", () => {
    test("returns the length of the string '💯'", () => {
        expect(Character()).toBe(2);
    });
});
describe("escapeCharacter", () => {
    test("returns true when comparing utf-16 and utf-32", () => {
        expect(escapeCharacter()).toBe(true);
    });
});