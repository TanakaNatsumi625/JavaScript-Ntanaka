import * as fs from "node:fs";
import * as fsPromises from "node:fs/promises";
import { join } from "node:path";

export async function fetchFirstFileSize(path) {
    try {
        const files = await fsPromises.readdir(path);

        if (files.length === 0) {
            return null; // ディレクトリが空の場合
        }
        const stats = await fsPromises.stat(join(path, files[0]));
        return stats.size;
    } catch (error) {
        throw error;
    }
}

export async function fetchSumOfFileSizes(path) {
    try {
        const files = await fsPromises.readdir(path);

        let totalSize = 0;

        for (const file of files) {
            const stats = await fsPromises.stat(join(path, file));
            totalSize += stats.size;
        }
        return totalSize;
    } catch (error) {
        throw error;
    }
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
