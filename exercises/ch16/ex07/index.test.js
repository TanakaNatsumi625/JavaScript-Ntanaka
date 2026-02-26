import { checkEntry } from "./index.js";

describe("checkEntry", () => {
    it("should return 'file' for a valid file path", () => {
        const result = checkEntry("./index.js");
        expect(result).toBe("file");
    });

    it("should return 'directory' for a valid directory path", () => {
        const result = checkEntry("./");
        expect(result).toBe("directory");
    });

    it("should return 'ファイルが存在しません' for a non-existent file", () => {
        const result = checkEntry("./unKnown.txt");
        expect(result).toBe("ファイルが存在しません");
    });

    it("should return 'ファイルパスのチェックに失敗しました' for other errors", () => {
        const result = checkEntry(null);
        expect(result).toBe("ファイルパスのチェックに失敗しました");
    });
});
