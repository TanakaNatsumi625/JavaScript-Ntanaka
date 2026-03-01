// これは指定されたディレクトリからファイルを提供するシンプルで静的なHTTP
// サーバ。また、受信したリクエストをエコーする特別な/test/mirror
// エンドポイントも実装している。これは、クライアントをデバッグする際に便利。
const http = require("http"); // 証明書を持っている場合は「https」を使用する。
const url = require("url"); // URL 解析用。
const path = require("path"); // ファイルシステムのパス操作用。
const fs = require("fs"); // ファイル読み込み用。


// 指定されたポートで待ち受けるHTTP サーバを介して、
// 指定されたルートディレクトリのファイルを提供する。
function serve(rootDirectory, port) {
    let server = new http.Server(); // 新しいHTTP サーバを作成する。
    server.listen(port); // 指定されたポートで待ち受ける。
    console.log("Listening on port", port);
    // リクエストが届いたら、この関数で処理を行う。
    server.on("request", (request, response) => {
        console.log("request:", request.method, request.url);
        // リクエストURL のパス部分を取得する。その際、付加されている
        // クエリパラメータは無視する。
        let endpoint = url.parse(request.url).pathname;
        console.log("endpoint:", endpoint);
        if (request.method === "GET") {
            // リクエストが「/test/mirror」の場合、リクエストをそのまま送り返す。
            // リクエストのヘッダやボディを見たい場合に便利。
            if (endpoint === "/test/mirror") {
                // レスポンスヘッダを設定する。
                response.setHeader("Content-Type", "text/plain; charset=UTF-8");
                // レスポンスのステータスコードを指定する。
                response.writeHead(200); // 200 OK
                // レスポンスボディの最初はリクエスト。
                response.write(`${request.method} ${request.url} HTTP/${request.httpVersion
                    }\r\n`);
                // リクエストヘッダを出力する。
                let headers = request.rawHeaders;
                for (let i = 0; i < headers.length; i += 2) {
                    response.write(`${headers[i]}: ${headers[i + 1]}\r\n`);
                }
                // ヘッダの末尾に空行を追加する。
                response.write("\r\n");
                // 次に、リクエストボディをレスポンスボディにコピーする必要がある。
                // 両方ともストリームなので、パイプを使うことができる。
                request.pipe(response);
            }
            // それ以外の場合は、ローカルディレクトリからファイルを提供する。
            else {
                // エンドポイントをローカルファイルシステムのファイルにマッピングする。
                let filename = endpoint.substring(1); // 最初の/を取り除く。
                // パス中の「../」を禁止する。ルートディレクトリの外側のファイルを提供する
                // ことになり、セキュリティホールになるから。
                filename = filename.replace(/\.\.\//g, "");
                // 次に、相対パスを絶対パスに変換する。
                filename = path.resolve(rootDirectory, filename);
                // 拡張子に基づいて、ファイルのコンテンツタイプを推測する。
                let type;
                switch (path.extname(filename)) {
                    case ".html":
                    case ".htm": type = "text/html"; break;
                    case ".js": type = "text/javascript"; break;
                    case ".css": type = "text/css"; break;
                    case ".png": type = "image/png"; break;
                    case ".txt": type = "text/plain"; break;
                    default: type = "application/octet-stream"; break;
                }
                // fs.readFile() を使うと、ファイル全体をメモリに読み込む必要がある。
                // 以下は比較用のコード
                // //メモリ使用量をログに出力する関数
                // logMemory("before readFile");
                // fs.readFile(filename, (err, data) => {
                //     if (err) {
                //         response.writeHead(500);
                //         response.end(err.message);
                //         return;
                //     }
                //     logMemory("after readFile");
                //     response.setHeader("Content-Type", type);
                //     response.writeHead(200);
                //     response.end(data);
                // });

                logMemory("before createReadStream");
                let stream = fs.createReadStream(filename);
                stream.once("readable", () => {
                    // ストリームが読み込めるようになったら、Content-Type ヘッダと
                    // 200 OK ステータスを設定する。そして、ファイル読み出し
                    // ストリームをレスポンスにパイプする。ストリームが終了すると、
                    // パイプは自動的にresponse.end() を呼び出す。
                    response.setHeader("Content-Type", type);
                    response.writeHead(200);
                    stream.pipe(response);
                    logMemory("after stream end");
                });
                stream.on("error", (err) => {
                    // ストリームを開こうとしてエラーが発生した場合、
                    // そのファイルはおそらく存在しないか、読めないと思われる。
                    // エラーメッセージをプレーンテキストで記述して、
                    // 404 Not Found レスポンスを送信する。
                    response.setHeader("Content-Type", "text/plain; charset=UTF-8");
                    response.writeHead(404);
                    response.end(err.message);
                });
            }
        } else if (request.method === "PUT") {
            // エンドポイントをローカルファイルシステムのファイルにマッピングする。
            let filename = endpoint.substring(1); // 最初の/を取り除く。
            // パス中の「../」を禁止する。ルートディレクトリの外側のファイルを提供する
            // ことになり、セキュリティホールになるから。
            filename = filename.replace(/\.\.\//g, "");
            // 次に、相対パスを絶対パスに変換する。
            filename = path.resolve(rootDirectory, filename);

            // もし指定したパスディレクトリが存在しない場合は新たに作成する
            fs.mkdirSync(path.dirname(filename), { recursive: true });


            // リクエストボディをファイルに書き込む。
            let stream = fs.createWriteStream(filename);
            stream.once("finish", () => {
                // 書き込みが完了したら、200 OK レスポンスを送信する。
                response.writeHead(200);
                response.end("File saved successfully");
            });
            stream.on("error", (err) => {
                // 書き込み中にエラーが発生した場合、500 Internal Server Error レスポンスを送信する。
                response.setHeader("Content-Type", "text/plain; charset=UTF-8");
                response.writeHead(500);
                response.end(err.message);
            });
            request.pipe(stream);
        }
    });
}

// コマンドラインから起動された場合は、serve() 関数を呼び出す。
serve(process.argv[2] || "/tmp", parseInt(process.argv[3]) || 8000);
    
function logMemory() {
    const mb = process.memoryUsage().rss / 1024 / 1024;
    console.log(`Memory: ${mb.toFixed(2)} MB`);
}

