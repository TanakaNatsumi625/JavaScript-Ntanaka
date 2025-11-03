import { promisify } from 'node:util';
import { readdir } from 'node:fs';
import { stat } from 'node:fs';
import fs from 'node:fs';

// promisify(readdir) で「Promiseを返す関数」に変換
const readdirAsync = promisify(readdir);
const statAsyncOfPromisify = promisify(stat);

//readdirAsyncでプロミス化しているので、thenとcatchで処理を分けられる
//fs.readdirは指定されたパスのディレクトリ内のファイル名の配列を返す
//ディレクトリ以外のパスはエラーになる
export const fsReaddirOfPromisify = (path) => {
    return readdirAsync(path).then(files => {
        console.log(files);
        return files;
    }).catch(err => {
        console.error(err);
        throw err;
    });
};
//statの動作確認
export function fsStatOfPromisify(path) {
    return statAsyncOfPromisify(path).then(stats => {
        console.log(stats.isFile());
        console.log(stats.isDirectory());
        return stats;
    }).catch(err => {
        console.error(err);
        throw err;
    });
}

//readdirを手動でPromiseラップする関数
//コンストラクタを使うことで、resoleveの時とRejectの時の処理を分けられる
//→使用するときにthenとcatchで処理を分けられる
export function fsReaddirOfPromise(path) {
    //PromiseコンストラクタでresoleveかRejectを呼び出す
    return new Promise((resolve, reject) => {
        fs.readdir(path, (err, files) => {
            if (err) {
                reject(err);
            } else {
                resolve(files);
            }
        });
    });
}

export function fsStatPromise(path) {
    return new Promise((resolve, reject) => {
        fs.stat(path, (err, stats) => {
            if (err) {
                reject(err);
            } else {
                resolve(stats);
            }
        });
    });
}

//動作確認
// fsReaddirOfPromisify('../exercises/ch13/ex03/');
// fsStatOfPromisify('../exercises/ch13/ex03/index.js');
// fsReaddirOfPromise('../exercises/ch13/ex03/index.js').then(files => {
//     console.log(files);
// }).catch(err => {
//     console.error(err);
// });
// fsStatPromise('../exercises/ch13/ex03/index.js').then(stats => {
//     console.log(stats.isFile());
//     console.log(stats.isDirectory());
// });




