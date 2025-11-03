import {walk} from "./index.js";
import fs from "fs";
import path from "path";

//テストディレクトリ構造は以下
// - testDir/
//   - file1.txt
//   - subDir/
//     - file2.txt
describe("walk generator function", () => {
    const testDir = "./exercises/ch12/ex06/testDir";
    beforeAll(() => {
        // テスト用ディレクトリとファイルを作成
        fs.mkdirSync(path.join(testDir, 'subDir'), { recursive: true });
        fs.writeFileSync(path.join(testDir, 'file1.txt'), 'Hello');
        fs.writeFileSync(path.join(testDir, 'subDir', 'file2.txt'), 'World!');
    });
    afterAll(() => {
        // テスト用ディレクトリとファイルを削除
        const files = fs.readdirSync(path.join(testDir, 'subDir'));
        files.forEach(file => fs.unlinkSync(path.join(testDir, 'subDir', file)));
        fs.rmdirSync(path.join(testDir, 'subDir'));
        fs.unlinkSync(path.join(testDir, 'file1.txt'));
        fs.rmdirSync(testDir);
    });
    //ディレクトリ構造を正しく巡回できるかのテスト
    it("should walk through directory structure correctly", () => {
        const entries = [];
        for (let entry of walk(testDir)) {
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
