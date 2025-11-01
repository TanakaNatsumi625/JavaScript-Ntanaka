import { fsReaddirOfPromisify, fsReaddirOfPromise, fsStatOfPromisify, fsStatOfPromisify } from "./index.js";
import jest from "jest-mock";
import { dirname, join } from 'node:path';

jest.mock('fs');

describe("fsReaddirOfPromisify", () => {
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
    it("should read directory contents without error", async () => {
        // fs.readdir を成功するモックにする
        readdir.mockImplementation((path, callback) => {
            callback(null, mockFiles);
        });
        // console.log をモック
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => { });

        fsReaddirOfPromisify('/some/path');

        expect(logSpy).toHaveBeenCalledWith(mockFiles);

        logSpy.mockRestore();
    });
});