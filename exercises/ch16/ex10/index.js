// Express フレームワークわかりやすい入門：https://qiita.com/ryome/items/16659012ed8aa0aa1fac
// これは指定されたディレクトリからファイルを提供するシンプルで静的なHTTP
// サーバ。また、受信したリクエストをエコーする特別な/test/mirror
// エンドポイントも実装している。これは、クライアントをデバッグする際に便利。
const express = require('express');
const path = require("path"); // ファイルシステムのパス操作用。
const app = express();
const fs = require('fs'); // ファイル読み込み用。

const ROOT_DIR = path.resolve(__dirname, process.argv[2] || 'public'); // ルートディレクトリを絶対パスで指定
const PORT = parseInt(process.argv[3]) || 3000;

// リクエストをログに記録するミドルウェアを実装
const loggerMiddleware = function (req, res, next) {
    console.log(`[${new Date()}] ${req.method} ${req.url}`);
    next();
};

app.use(loggerMiddleware);

// リクエストボディを解析するミドルウェア
app.use(express.text({ type: '*/*' }));

// 静的ファイルを提供するミドルウェアを実装
app.use(express.static('ROOT_DIR'));


// 拡張子→Content-Type（元コードと同じマッピング）
// ここにない拡張子が来ると“application/octet-stream”になる(テストで失敗した)
function guessContentType(filename) {
  switch (path.extname(filename).toLowerCase()) {
    case '.html':
    case '.htm': return 'text/html; charset=UTF-8';
    case '.js':  return 'text/javascript; charset=UTF-8';
    case '.css': return 'text/css; charset=UTF-8';
    case '.png': return 'image/png';
    case '.jpg': return 'image/jpeg';
    case '.txt': return 'text/plain; charset=UTF-8';
    default:     return 'application/octet-stream';
  }
}

// 静的ファイル配信用のカスタムミドルウェア
app.use((req, res, next) => {
  // 既に定義されている特定のエンドポイントはスキップ
  if (req.path === '/test/mirror' || req.path === '/' || req.method !== 'GET') {
    return next();
  }

  // URLデコード
  const endpoint = decodeURIComponent(req.path); 
  let filename = endpoint.substring(1); // 最初の/を取り除く

  // ../ を除去
  filename = filename.replace(/\.\.\//g, ""); // 例: docs/readme.txt

  // 絶対パス化
  const absPath = path.resolve(ROOT_DIR, filename);

  // ルート外アクセスの拒否
  // 例: /files/../../secret → ROOT_DIR で始まらないので拒否
  const rootWithSep = ROOT_DIR.endsWith(path.sep) ? ROOT_DIR : ROOT_DIR + path.sep;
  if (!absPath.startsWith(rootWithSep)) {
    return res.status(403).type('text/plain; charset=UTF-8').send('403 Forbidden');
  }

  // コンテンツタイプ
  const type = guessContentType(absPath);

  //ストリームで返す（元コードと同じ流れ）
  const stream = fs.createReadStream(absPath);

  stream.once('readable', () => {
    res.set('Content-Type', type);
    // res.writeHead(200) は Express では不要。status を明示したいなら res.status(200)
    stream.pipe(res);
  });

  stream.on('error', (err) => {
    if (err.code === 'ENOENT') {
      return next(); // 404の場合は次のミドルウェアに進む
    } else {
      next(err); // 500 ハンドラに委譲
    }
  });
});

// リクエストの鏡写し/test/mirrorエンドポイント
// 以下が返ってくる
// 
app.get('/test/mirror', (req, res) => {
    // レスポンスヘッダを設定する
    res.setHeader("Content-Type", "text/plain; charset=UTF-8");
    
    // レスポンスボディの最初はリクエスト
    let responseBody = `${req.method} ${req.url} HTTP/${req.httpVersion}\r\n`;
    
    // リクエストヘッダを出力する
    for (const [key, value] of Object.entries(req.headers)) {
        responseBody += `${key}: ${value}\r\n`;
    }
    
    // ヘッダの末尾に空行を追加
    responseBody += "\r\n";
    
    // リクエストボディがある場合は追加
    if (req.body) {
        responseBody += req.body;
    }
    
    res.status(200).send(responseBody);
});

// 404ハンドラ（最後に配置）
app.use((req, res) => {
    res.status(404).type('text/plain; charset=UTF-8').send('404 Not Found');
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});


// これが Supertest から使われる
module.exports = app;


// ログのミドルウェアを起動しておくと、例えば以下のようにログが出る
// Listening on port 3000
// [Thu Feb 26 2026 23:03:49 GMT+0900 (日本標準時)] GET /test/mirror
// [Thu Feb 26 2026 23:04:25 GMT+0900 (日本標準時)] GET /test/mirror
// [Thu Feb 26 2026 23:05:07 GMT+0900 (日本標準時)] GET /images
// [Thu Feb 26 2026 23:05:07 GMT+0900 (日本標準時)] GET /images/
// Error: EISDIR: illegal operation on a directory, read
// [Thu Feb 26 2026 23:05:27 GMT+0900 (日本標準時)] GET /images/test.jpg
// [Thu Feb 26 2026 23:05:33 GMT+0900 (日本標準時)] GET /images/test.jpg
// [Thu Feb 26 2026 23:05:51 GMT+0900 (日本標準時)] GET /doc/README.txt
// [Thu Feb 26 2026 23:06:00 GMT+0900 (日本標準時)] GET /docs/README.txt