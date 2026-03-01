import net from "net";

const html = `<!doctype html>
   <html lang="ja">
     <head>
       <meta charset="UTF-8" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>Greeting Form</title>
     </head>
     <body>
       <form action="/greeting" method="POST">
         <label for="greeting">Name:</label>
         <input type="text" id="name" name="name" />
         <input type="text" id="greeting" name="greeting" />
         <button type="submit">Submit</button>
       </form>
         <div id="response">{{Greeting}}</div>
     </body>
   </html>`;


const server = net.createServer((socket) => {
    socket.on("data", (data) => {
        const requestText = data.toString();
        // 以下が返ってくる
        // Received data: GET / HTTP/1.1
        // User-Agent: Mozilla/5.0 (Windows NT; Windows NT 10.0; ja-JP) WindowsPowerShell/5.1.22621.6345
        // Host: localhost:8000
        // Connection: Keep-Alive
        console.log("Received data:", requestText);

        // HTTPリクエストの最初の行を解析する
        const requestLine = requestText.split("\r\n")[0];
        console.log("Request Line:", requestLine); //Request Line: GET / HTTP/1.1
        // 上記で分けたGet,/,HTTP/1.1をそれぞれ変数に入れる
        const [method, path, version] = requestLine.split(" ");

        console.log("Method:", method, "Path:", path, "Version:", version); //Method: GET Path: / Version: HTTP/1.1

        // HTTPレスポンスを送る
        if (method === "GET" && path === "/") {
            const responseHtml = html.replace("{{Greeting}}", "");
            const response =
                "HTTP/1.1 200 OK\r\n" +
                "Content-Type: text/html; charset=UTF-8\r\n" +
                "Content-Length: " + Buffer.byteLength(responseHtml) + "\r\n" +
                "\r\n" +
                responseHtml;

            socket.write(response);
            socket.end();
        } else if (method === "POST" && path === "/greeting") {
            // リクエストボディを解析する
            const body = requestText.split("\r\n\r\n")[1];
            console.log("Request Body:", body); //Request Body: name=Tanaka&greeting=Hello
            // body解析のため、まずは&で分割して、次に=で分割する
            const result = {};
            const pairs = body.split("&");
            for (const pair of pairs) {
                const [key, value] = pair.split("=");
                result[key] = decodeURIComponent(value);
            }
            console.log("Parsed Body:", result); //Parsed Body: { name: 'Tanaka', greeting: 'Hello' }
            // HTMLの{{Greeting}}を置換する
            const message = `${result.greeting}, ${result.name}!`;
            const responseHtml = html.replace("{{Greeting}}", message);

            const response =
                "HTTP/1.1 200 OK\r\n" +
                "Content-Type: text/html; charset=UTF-8\r\n" +
                "Content-Length: " + Buffer.byteLength(responseHtml) + "\r\n" +
                "\r\n" +
                responseHtml;

            socket.write(response);
            socket.end();
        } else {
            const response =
                "HTTP/1.1 404 Not Found\r\n" +
                "Content-Type: text/html; charset=UTF-8\r\n" +
                "Content-Length: 0\r\n" +
                "\r\n";

            socket.write(response);
            socket.end();
        }
    });
});

server.listen(8000, () => {
    console.log("Server listening on port 8000");
});