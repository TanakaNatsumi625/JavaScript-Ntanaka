import net from "net";
import "./index.js";

function sendRequest(request) {
    return new Promise((resolve, reject) => {
        let client = net.createConnection({ port: 8000 }, () => {
            client.write(request);
        });
        let response = "";
        client.on("data", (data) => {
            response += data.toString();
        });
        client.on("end", () => {
            resolve(response);
        }); 
        client.on("error", (err) => {
            reject(err);
        });
    });
}

describe("netServerテスト", () => {
    it(" "/"が GET されたとき以下の HTML を返却する", async () => {
        const request =
            "GET / HTTP/1.1\r\n" +
            "Host: localhost:8000\r\n" +
            "\r\n";
        
        const response = await sendRequest(request);

        expect(response).toContain("HTTP/1.1 200 OK");
        expect(response).toContain("Content-Type: text/html; charset=UTF-8");
        expect(response).toContain('<form action="/greeting" method="POST">');
    }
    );
    it(" /greetingが POST されたとき、リクエストボディの内容を HTML に埋め込んで返却する", async () => {
        const request =
            "POST /greeting HTTP/1.1\r\n" +
            "Host: localhost:8000\r\n" +
            "Content-Type: application/x-www-form-urlencoded\r\n" +
            "Content-Length: 27\r\n" +
            "\r\n" +
            "name=Tanaka&greeting=Hello";
        
        const response = await sendRequest(request);

        expect(response).toContain("HTTP/1.1 200 OK");
        expect(response).toContain("Content-Type: text/html; charset=UTF-8");
        expect(response).toContain("Tanaka");
        expect(response).toContain("Hello");
    });
    it("それ以外のリクエストが来たとき、404 Not Found を返却する", async () => {
        const request =
            "GET /unknown HTTP/1.1\r\n" +
            "Host: localhost:8000\r\n" +
            "\r\n";
        
        const response = await sendRequest(request);

        expect(response).toContain("HTTP/1.1 404 Not Found");
    });
});