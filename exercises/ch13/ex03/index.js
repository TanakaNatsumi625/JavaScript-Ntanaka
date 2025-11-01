import { promisify } from 'node:util';
import { readdir } from 'node:fs';
import { stat } from 'node:fs';
import fs from 'node:fs';

// promisify(readdir) で「Promiseを返す関数」に変換
const readdirAsync = promisify(readdir);

//呼び出して実行
export function fsReaddirOfPromisify(path) {
    return readdirAsync(path)
        .then(files => {
            console.log(files);
        })
        .catch(err => {
            console.error(err);
        });
}


//動作確認
//fsReaddirOfPromisify('../');

//readdirを手動でPromiseラップする関数
export function fsReaddirOfPromise(path) {
    return readdirPromise(path)
        .then(files => {
            console.log(files);
        })
        .catch(err => {
            console.error(err);
            throw err;
        });
}

// //手動ラップ呼び出して実行
// const statAsync = promisify(stat);

// export function fsStatOfPromisify(filePath) {
//     return statAsync(filePath)
//         .then(stats => {
//             console.log(stats.isFile());
//             console.log(stats.isDirectory());
//         })
//         .catch(err => {
//             console.error(err);
//         });
// }


// //動作確認
// //fsReaddirOfPromise('../').then(() => {
// //     console.log('fsReaddirOfPromise done');
// // });

// //stat
// const statAsync = promisify(stat);

// export async function fsStatOfPromisify(filePath) {
//     try {
//         const stats = await statAsync(filePath);
//         console.log(stats.isFile());
//         console.log(stats.isDirectory());
//     } catch (err) {
//         console.error(err);
//     }
// }

// //動作確認
// fsStatOfPromisify('ch13/ex03/index.js');

// function statPromise(path) {
//     return new Promise((resolve, reject) => {
//         fs.stat(path, (err, stats) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(stats);
//             }
//         });
//     });
// }

// export function fsStatOfPromise(filePath) {
//     return statPromise(filePath)
//         .then(stats => {
//             console.log(stats);
//         })
//         .catch(err => {
//             console.error(err);
//             throw err;
//         });
// }

//動作確認
fsStatOfPromise('ch13/ex03/index.js');



