import fs from "fs";
import { readLines } from "./index.js";
import { jest } from "@jest/globals";

describe("readLines generator function", () => {
    const testFile = "test.txt";
    const content = "line1\nline2\nline3";
    beforeAll(() => {
        fs.writeFileSync(testFile, content, "utf8");
    });
    afterAll(() => {
        fs.unlinkSync(testFile);
    });
    it("should read lines from a file correctly", () => {
        const lines = [];
        for (let line of readLines(testFile)) {
            lines.push(line);
        }
        expect(lines).toEqual(["line1", "line2", "line3"]);
    });
    it("should handle empty files", () => {
        const emptyFile = "empty.txt";
        fs.writeFileSync(emptyFile, "", "utf8");
        const lines = [];
        for (let line of readLines(emptyFile)) {
            lines.push(line);
        }
        expect(lines).toEqual([]);
        fs.unlinkSync(emptyFile);
    });
    it("closes file even when broken early", () => {
        const closeSpy = jest.spyOn(fs, "closeSync");
        for (const line of readLines(testFile)) {
            if (line === "line1") break;
        }
        expect(closeSpy).toHaveBeenCalledTimes(1);
        closeSpy.mockRestore();
    });
});