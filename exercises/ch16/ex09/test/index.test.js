const request = require('supertest');
const app = require('../index.js'); // サーバのエクスポートされたアプリケーションをインポート

describe('GET /', () => {
  it('GET /test/mirror はヘッダとボディをエコーする', async () => {
    const response = await request(app).get('/test/mirror');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/text\/plain/);
    expect(response.text).toContain('GET /test/mirror HTTP/');
  });
  it('GET /hello.txt はファイルの内容を返す', async () => {
    const response = await request(app).get('/hello.txt');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/text\/plain/);
    expect(response.text).toBe('Hello world!');
  });
  it('GET /images/test.jpg のContents Typeはimage/jpeg', async () => {
    const response = await request(app).get('/images/test.jpg');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/image\/jpeg/);
  });
  it('GET /unknown.txt は404を返す', async () => {
    const response = await request(app).get('/unknown.txt');
    expect(response.status).toBe(404);
  });
});
