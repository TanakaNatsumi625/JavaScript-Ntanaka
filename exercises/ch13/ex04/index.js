import * as fsPromises from "node:fs/promises";
import { join } from "node:path";

export function fetchFirstFileSize(path) {
    return fsPromises.readdir(path)
        .then(files => {
            if (files.length === 0) return null;
            return fsPromises.stat(join(path, files[0]))
                .then(stats => stats.size);
        });
}

export function fetchSumOfFileSizes(path) {
    return fsPromises.readdir(path)
        .then(files => {
            let totalSize = 0;

            // files を順に処理する Promise チェーンを作る
            let p = Promise.resolve();
            files.forEach(file => {
                p = p.then(() => fsPromises.stat(join(path, file)))
                     .then(stats => { totalSize += stats.size; });
            });

            // 最後に totalSize を返す
            return p.then(() => totalSize);
        });
}

// 動作確認用コード
// import { join } from "node:path";
// const test = join('.','ch13', 'ex04');

// fetchFirstFileSize(test)
//     .then(size => {
//         console.log('First file size:', size);
//     })
//     .catch(error => {
//         console.error('Error fetching first file size:', error);
//     });

// fetchSumOfFileSizes(test)
//     .then(totalSize => {
//         console.log('Total file size:', totalSize);
//     })
//     .catch(error => {
//         console.error('Error fetching total file size:', error);
//     });
