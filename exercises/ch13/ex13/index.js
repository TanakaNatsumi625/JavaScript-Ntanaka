import fs from "fs";
import path from "path";

export async function* walk(rootPath) {
    //stats: ファイルやディレクトリの情報を持つオブジェクト
    const stats = await fs.statSync(rootPath);
    // パスとディレクトリかどうかの情報をyieldで返す
    yield { path: rootPath, isDirectory: stats.isDirectory() };

    // ディレクトリの場合、再帰的に中身を探索
    if (stats.isDirectory()) {
        //ディレクトリ内のファイルやディレクトリを探索
        const entries = await fs.readdirSync(rootPath);
        // 各エントリに対してwalkを再帰的に呼び出す
        //よってネストされたディレクトリも探索可能
        for (const entry of entries) {
            const fullPath = path.join(rootPath, entry);
            yield* walk(fullPath); // 再帰的にwalkを呼び出す
        }
    }
}

//以下、動作確認コード
// (async () => {
//     for await (let entry of walk("./ch12/ex06")) {
//         console.log(`${entry.isDirectory ? "Dir: " : "File:"} ${entry.path}`);
//     }
// })();
