import { walk } from "./index.js";
import fs from "fs/promises";
import path from "path";
//テストディレクトリ構造は以下
// - testDir/
//   - file1.txt
//   - subDir/
//     - file2.txt
describe("walk", () => {
    const testDir = "./exercises/ch13/ex13/testDir";
    beforeAll(async () => {
        // テスト用ディレクトリとファイルを作成
        await fs.mkdir(path.join(testDir, 'subDir'), { recursive: true });
        await fs.writeFile(path.join(testDir, 'file1.txt'), 'Hello');
        await fs.writeFile(path.join(testDir, 'subDir', 'file2.txt'), 'World!');
    });
    afterAll(async () => {
        // 作成したテスト用ディレクトリを削除
        await fs.rm('./testDir', { recursive: true, force: true });
    });
    it("should yield file and directory paths", async () => {
        const entries = [];
        for await (const entry of walk(testDir)) {
            entries.push(entry);
        }
        const paths = entries.map(e => e.path);
        // テストディレクトリとその中のファイル・サブディレクトリが含まれていることを確認
        expect(paths).toContain(testDir);//一番上のディレクトリ
        expect(paths).toContain(path.join(testDir, 'file1.txt'));//直下のファイル
        expect(paths).toContain(path.join(testDir, 'subDir'));//直下のサブディレクトリ
        expect(paths).toContain(path.join(testDir, 'subDir', 'file2.txt'));//サブディレクトリ内のファイル
        const dirEntries = entries.filter(e => e.isDirectory).map(e => e.path); // ディレクトリのみ抽出したときのテスト
        expect(dirEntries).toContain(testDir);//一番上のディレクトリ
        expect(dirEntries).toContain(path.join(testDir, 'subDir'));//サブディレクトリ
    });
});
