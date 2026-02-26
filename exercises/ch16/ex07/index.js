import fs from "fs";
import path from "path";

/*
 * 指定されたファイルパスがファイルかディレクトリかを確認する関数
 * @param {string} filePath - 確認するファイルのパス
 * @returns {String} - ファイルが存在する場合は"file"、存在しない場合は"directory"
 * エラーが発生した場合は"ファイルパスのチェックに失敗しました"を返す
 */
export function checkEntry(filePath) {
    try {
        console.log(`Checking path: ${filePath}`); // チェックするパスをログに出力
        const stats = fs.statSync(filePath); // ファイルの情報を取得
        console.log(`Stats: ${JSON.stringify(stats)}`); // 取得した情報をログに出力
        if (stats.isFile()) {
            return "file"; // ファイルが存在する場合は"file"を返す
        } else {
            return "directory"; // ディレクトリが存在する場合は"directory"を返す
        }

    } catch (error) {
        console.error(`Error checking: ${JSON.stringify(error)}`); // エラーが発生した場合はエラーメッセージをログに出力
        if (error.code === "ENOENT") {
            return "ファイルが存在しません"; // ファイルが存在しない場合は"ファイルが存在しません"を返す
        } else {
            console.error(`Error checking path: ${error.message}`);
            return "ファイルパスのチェックに失敗しました"; // エラーが発生した場合は"ファイルパスのチェックに失敗しました"を返す
        }
    }
}

// 以下、動作確認コード
// ファイル確認
const result1 = checkEntry("./index.js");
console.log(result1);
// ディレクトリ確認
const result2 = checkEntry("./");
console.log(result2);
// 存在しないファイル確認
const result3 = checkEntry("./unKnown.txt");
console.log(result3);
// その他エラー
const result4 = checkEntry(null);
console.log(result4);

// 以下コンソール
// Checking path: ./index.js
// Stats: {"dev":371187433,"mode":33206,"nlink":1,"uid":0,"gid":0,"rdev":0,"blksize":4096,"ino":108367866033751520,"size":2043,"blocks":8,"atimeMs":1771944374567.355,"mtimeMs":1771944372752.158,"ctimeMs":1771944372752.158,"birthtimeMs":1771943075578.4263}
// file
// Checking path: ./
// Stats: {"dev":371187433,"mode":16822,"nlink":1,"uid":0,"gid":0,"rdev":0,"blksize":4096,"ino":76561193665461920,"size":0,"blocks":0,"atimeMs":1771944374035.13,"mtimeMs":1771943075578.4263,"ctimeMs":1771943075578.4263,"birthtimeMs":1771943064494.608}
// directory
// Checking path: ./unKnown.txt
// Error checking: {"errno":-4058,"code":"ENOENT","syscall":"stat","path":"C:\\Users\\r00000625\\myRipository\\JavaScript-Ntanaka\\exercises\\ch16\\ex07\\unKnown.txt"}
// ファイルが存在しません
// Checking path: null
// Error checking: {"code":"ERR_INVALID_ARG_TYPE"}
// Error checking path: The "path" argument must be of type string or an instance of Buffer or URL. Received null
// ファイルパスのチェックに失敗しました
