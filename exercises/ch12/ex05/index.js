import fs from "fs";
//ファイル読み込み参考：https://www.pxt.jp/ja/diary/article/268/

export function* readLines(filePath) {
    //ファイルを開く。第二引数のrは読み取り専用を意味する
    const data = fs.openSync(filePath, 'r');
    //前回の読み取りで残ったデータを保存する変数
    let leftover = "";
    //一回で読み取るバッファサイズ
    const bufferSize = 1024;
    //一定サイズのバッファを確保
    const buffer = Buffer.alloc(bufferSize);

    try {
        while (true) {
            //ファイルからデータを読み取る
            const bytesRead = fs.readSync(data, buffer, 0, bufferSize, null);
            if (bytesRead === 0) break; // EOF

            const chunk = leftover + buffer.toString("utf8", 0, bytesRead);
            const lines = chunk.split("\n");
            leftover = lines.pop(); // 最後の不完全行を残す

            for (const line of lines) {
                yield line; // 改行を除去して返す
            }
        }

        // ファイル末尾に残っていたデータを最後の1行として返す
        if (leftover) yield leftover;
    } finally {
        //ファイルを閉じる
        fs.closeSync(data);
    }
}

//以下、動作確認コード
// for (let line of readLines("./ch12/ex05/sample.txt")) {
//     console.log(line);
// }
// const text = fs.readFileSync('./ch12/ex05/sample.txt', 'utf8');
// console.log(text.split("\n"));