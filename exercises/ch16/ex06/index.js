import fs  from "fs";

const filePath = './sample.txt';
// fs.truncate()は第三引数にコールバック関数を取る
// 参考：https://www.geeksforgeeks.org/node-js/node-js-fs-truncate-method/
// コールバック地獄だが、仕様に合わせてみたかった…

// 元のファイルの内容を確認する
fs.readFile(filePath, (err, data) => {
    if (err) throw err;
    console.log('Before truncating:', data);//Before truncating: <Buffer 48 65 6c 6c 6f 20 77 6f 72 6c 64 21 0d 0a>
    // ファイルを切り詰める
    fs.truncate(filePath, 5, (err) => {
        if (err) throw err;
        // 切り詰めた後のファイルの内容を確認する
        fs.readFile(filePath, (err, data) => {
            if (err) throw err;
            console.log('After truncating:', data);//After truncating: <Buffer 48 65 6c 6c 6f>
            // 今度は拡張してみる
            fs.truncate(filePath, 10, (err) => {
                if (err) throw err;
                // 拡張した後のファイルの内容を確認する
                fs.readFile(filePath, (err, data) => {
                    if (err) throw err;
                    console.log('After extending:', data);//After extending: <Buffer 48 65 6c 6c 6f 00 00 00 00 00>
                });
            });
        });
    });
});



