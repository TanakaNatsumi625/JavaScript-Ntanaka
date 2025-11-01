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
        await fs.promises.mkdir(testDir, { recursive: true });
        await fs.promises.writeFile(join(testDir, 'file1.txt'), 'Hello');   // 5 bytes
        await fs.promises.writeFile(join(testDir, 'file2.txt'), 'World!');  // 6 bytes
    });
    afterAll(async () => {
        // テスト用ディレクトリとファイルを削除
        try {
            const files = await fs.promises.readdir(testDir);
            await Promise.all(files.map(file => fs.promises.unlink(join(testDir, file))));
            await fs.promises.rmdir(testDir);
        } catch (error) {
            // ディレクトリが存在しない場合は無視
        }
    });
    it("should return the size of the first file", async () => {
        const size = await fetchFirstFileSize(testDir);
        expect(size).toBe(5); // 'file1.txt' のサイズは 5 bytes
    });
    it("should return the sum of all file sizes", async () => {
        const totalSize = await fetchSumOfFileSizes(testDir);
        expect(totalSize).toBe(11); // 'file1.txt' (5 bytes) + 'file2.txt' (6 bytes) = 11 bytes
    });
    it("should return null for empty directory in fetchFirstFileSize", async () => {
        const emptyDir = join(__dirname, 'emptyDir');
        await fs.promises.mkdir(emptyDir, { recursive: true });
        const size = await fetchFirstFileSize(emptyDir);
        expect(size).toBeNull();
        await fs.promises.rmdir(emptyDir);
    });
    test('fetchFirstFileSize throws error for non-existent directory', async () => {
        await expect(fetchFirstFileSize('no-such-dir')).rejects.toThrow();
    });

    test('fetchSumOfFileSizes throws error for non-existent directory', async () => {
        await expect(fetchSumOfFileSizes('no-such-dir')).rejects.toThrow();
    });
});
