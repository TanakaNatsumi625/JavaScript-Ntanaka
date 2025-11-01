import { fetchFirstFileSize, fetchSumOfFileSizes } from "./index.js";
import { join, dirname } from "node:path";
import fs from "node:fs";
import { fileURLToPath } from 'url';

describe("file size function", () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const testDir = join(__dirname, 'testDir');

    beforeAll(async () => {
        // テスト用ディレクトリとファイルを作成
        return fs.promises.mkdir(testDir, { recursive: true })
            .then(() => fs.promises.writeFile(join(testDir, 'file1.txt'), 'Hello'))   // 5 bytes
            .then(() => fs.promises.writeFile(join(testDir, 'file2.txt'), 'World!'));  // 6 bytes
    });
    afterAll(() => {
        // テスト用ディレクトリとファイルを削除
        return fs.promises.readdir(testDir)
            .then(files => Promise.all(files.map(file => fs.promises.unlink(join(testDir, file)))))
            .then(() => fs.promises.rmdir(testDir))
            .catch(() => {
                // ディレクトリが存在しない場合は無視
            });
    });
    it("should return the size of the first file", () => {
        return fetchFirstFileSize(testDir).then(size => {
            expect(size).toBe(5); // 'file1.txt' のサイズは 5 bytes
        });
    });
    it("should return the sum of all file sizes", () => {
        return fetchSumOfFileSizes(testDir).then(totalSize => {
            expect(totalSize).toBe(11); // 'file1.txt' (5 bytes) + 'file2.txt' (6 bytes) = 11 bytes
        });
    });
    it("should return null for empty directory in fetchFirstFileSize", () => {
        const emptyDir = join(__dirname, 'emptyDir');
        return fs.promises.mkdir(emptyDir, { recursive: true })
            .then(() => fetchFirstFileSize(emptyDir))
            .then(size => {
                expect(size).toBeNull();
            })
            .finally(() => fs.promises.rmdir(emptyDir));
    });
    it('fetchFirstFileSize throws error for non-existent directory', () => {
        return expect(fetchFirstFileSize('no-such-dir')).rejects.toThrow();
    });

    it('fetchSumOfFileSizes throws error for non-existent directory', () => {
        return expect(fetchSumOfFileSizes('no-such-dir')).rejects.toThrow();
    });
});
