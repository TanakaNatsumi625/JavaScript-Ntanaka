import { dirname, join } from "node:path";
import { fileURLToPath } from 'url';
import { fetchSumOfFileSizesParallel } from "./index.js";
import { mkdir, writeFile, readdir, unlink } from "node:fs/promises";

describe("file size function", () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const testDir = join(__dirname, 'testDir');

    beforeAll(async () => {
        await mkdir(testDir, { recursive: true });
        await writeFile(join(testDir, 'file1.txt'), 'Hello');   // 5 bytes
        await writeFile(join(testDir, 'file2.txt'), 'World!');  // 6 bytes
    });

    afterAll(async () => {
        await readdir(testDir)
        await Promise.all((await readdir(testDir)).map(file => unlink(join(testDir, file))));
    });
    it("should return the sum of all file sizes in parallel", async () => {
        const totalSize = await fetchSumOfFileSizesParallel(testDir);
        expect(totalSize).toBe(11);
    });

    it('fetchSumOfFileSizesParallel throws error for non-existent directory', () => {
        return expect(fetchSumOfFileSizesParallel('no-such-dir')).rejects.toThrow();
    });
    });