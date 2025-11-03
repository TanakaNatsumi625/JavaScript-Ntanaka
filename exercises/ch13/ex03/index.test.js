import { fsReaddirOfPromisify, fsStatOfPromisify, fsReaddirOfPromise, fsStatPromise } from "./index.js";
import fs from "fs";
import path from "path";
//テストディレクトリ構造は以下
// - testDir/
//   - file1.txt
//   - subDir/
//     - file2.txt

describe("functions to promisify fs methods", () => {
    const testDir = "./exercises/ch13/ex03/testDir";
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
    it("fsReaddirOfPromisify should read directory contents", () => {
        // 正しいディレクトリパスを渡した場合
        return fsReaddirOfPromisify(testDir).then(files => {
            expect(files).toEqual(['file1.txt', 'subDir']);
        });
    });
    it("fsReaddirOfPromisify should handle non-directory paths", () => {
        // 存在しないディレクトリパスを渡した場合
        fsReaddirOfPromisify(path.join(testDir, 'file1.txt')).catch(err => {
            expect(err).rejects.toThrow();
        });
    });
    it("fsStatOfPromisify should get file stats", () => {
        // 正しいファイルパスを渡した場合
        fsStatOfPromisify(path.join(testDir, 'file1.txt')).then(stats => {
            expect(stats.isFile()).toBe(true);
            expect(stats.isDirectory()).toBe(false);
        });
        // 正しいディレクトリパスを渡した場合
        fsStatOfPromisify(testDir).then(stats => {
            expect(stats.isFile()).toBe(false);
            expect(stats.isDirectory()).toBe(true);
        });
    });
    it("fsStatOfPromisify should handle non-existent paths", () => {
        // 存在しないパスを渡した場合
        fsStatOfPromisify(path.join(testDir, 'nonexistent')).catch(err => {
            expect(err).rejects.toThrow();
        });
    });
});

describe("Promise constructor functions", () => {
    const testDir = "./exercises/ch13/ex03/testDir";
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
    it("fsReaddirOfPromise should read directory contents", () => {
        // 正しいディレクトリパスを渡した場合
        fsReaddirOfPromise(testDir).then(files => {
            expect(files).toEqual(['file1.txt', 'subDir']);
        });
    });
    it("fsReaddirOfPromise should handle non-directory paths", () => {
        // ディレクトリファイル以外のパスを渡した場合
        fsReaddirOfPromise(path.join(testDir, 'file1.txt')).catch(err => {
            expect(err).rejects.toThrow();
        });
    });
    it("fsStatPromise should get file stats", () => {
        // 正しいファイルパスを渡した場合
        fsStatPromise(path.join(testDir, 'file1.txt')).then(stats => {
            expect(stats.isFile()).toBe(true);
            expect(stats.isDirectory()).toBe(false);
        });
        // 正しいディレクトリパスを渡した場合
        fsStatPromise(testDir).then(stats => {
            expect(stats.isFile()).toBe(false);
            expect(stats.isDirectory()).toBe(true);
        });
    });
    it("fsStatOfPromise should handle non-existent paths", () => {
        // 存在しないパスを渡した場合
        fsStatPromise(path.join(testDir, 'nonexistent')).catch(err => {
            expect(err).rejects.toThrow();
        });
    });
});



