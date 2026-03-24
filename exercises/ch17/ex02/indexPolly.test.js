import { Polly } from '@pollyjs/core';
import NodeHttpAdapter from '@pollyjs/adapter-node-http';
import FSPersister from '@pollyjs/persister-fs';
import { listIssues } from './issueLib.js';

Polly.register(NodeHttpAdapter);
Polly.register(FSPersister);

describe("GitHub API", () => {
  let polly;


  beforeEach(() => {
    polly = new Polly("github-issues", {
      adapters: ["node-http"],
      persister: "fs",
      persisterOptions: {
        fs: {
          recordingsDir: "recordings"
        }
      },
      // 録画が無ければ記録、あればリプレイ
      mode: "record", // ← 最初の1回だけ。録画できたら "replay" に変える
      recordIfMissing: true,
      // Authorization をマッチキーから除外
      matchRequestsBy: {
        headers: {
          exclude: ['authorization']
        },
        // クエリ順序などでズレるなら次も有効
        // url: { ignoreSearch: false, query: { order: false } }
      }
    });

    // （任意）録画に残したくないヘッダーを削る
    const { server } = polly;
    server.any().on('beforePersist', (req, recording) => {
      if (recording?.request?.headers) {
        recording.request.headers = recording.request.headers.filter(
          h => h.name.toLowerCase() !== 'authorization'
        );
      }
    });
  });


  afterEach(async () => {
    await polly.stop();
  });

  it("Issueの一覧を取得する", async () => {
    console.log('Token:', process.env.GITHUB_TOKEN);

    const result = await listIssues("octocat", "Hello-World", false, "mock-token");
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
  });
});