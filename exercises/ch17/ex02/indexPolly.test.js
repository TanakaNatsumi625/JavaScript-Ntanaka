import { Polly } from '@pollyjs/core';
import FetchAdapter from '@pollyjs/adapter-fetch';;
import FSPersister from '@pollyjs/persister-fs';
import { listIssues, createIssue, closeIssue } from './issueLib.js';

Polly.register(FetchAdapter);
Polly.register(FSPersister);

describe("Issueの一覧を表示する", () => {
  let polly;

  beforeEach(() => {
    polly = new Polly("github-issues", {
      adapters: ["fetch"],
      persister: "fs", 
      persisterOptions: {
        fs: {
          recordingsDir: "./ex02/recordings"
        }
      },
      recordIfMissing: true, // 録音が存在しない場合にのみ新しい録音を作成する
      recordFailedRequests: true, // 失敗したリクエストも録音する
      matchRequestsBy: {
        method: true,
        url: true,
        headers: false, // ヘッダーはマッチングに使用しない（Authorizationヘッダーを除外するため）
        body: false
      }
    });
    // Authorizationヘッダーを録音から除外するためのフック
    polly.server.any().on("beforePersist", (_, recording) => {
    recording.request.headers =
      recording.request.headers.filter(
        h => h.name.toLowerCase() !== "authorization"
      );
  });
  });


  afterEach(async () => {
    await polly.stop();
  });

  it("Issueの一覧を取得する", async () => {
    const result = await listIssues("TanakaNatsumi625", "JavaScript-Ntanaka", true, process.env.GITHUB_TOKEN);
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
  });

  it("Issueの一覧を取得する（空のレスポンス）", async () => {
    // 空のレスポンスを設定
    // エラー系はpolly.serverでモック化するとよい？
    polly.server
      .get('https://api.github.com/repos/TanakaNatsumi625/JavaScript-Ntanaka/issues')
      .intercept((req, res) => {
        res.status(200).json([]);
      });
      
    const result = await listIssues("TanakaNatsumi625", "JavaScript-Ntanaka", true, "dummy-token");
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    // Issueの一覧が空であることを確認する。何も設定していないので。
    expect(result).toHaveLength(0);
  });

  it("Issueの一覧を取得する（エラーケース）", async () => {
    // エラーレスポンスを設定
    polly.server
      .get('https://api.github.com/repos/TanakaNatsumi625/JavaScript-Ntanaka/issues')
      .intercept((req, res) => {
        res.status(500).json({ message: "Internal Server Error" });
      });
    
    await expect(listIssues("TanakaNatsumi625", "JavaScript-Ntanaka", true, "dummy-token")).rejects.toThrow("GitHub API error! status: 500, message: {\"message\":\"Internal Server Error\"}");
  });
  
});

describe("Issueを作成する", () => {
  let polly;

  beforeEach(() => {
    polly = new Polly("github-create-issue", {
      adapters: ["fetch"],
      persister: "fs",
      persisterOptions: {
        fs: {
          recordingsDir: "./ex02/recordings"
        }
      },
      recordIfMissing: true,
      recordFailedRequests: true,
      matchRequestsBy: {
        method: true,
        url: true,
        headers: false,
        body: true
      }
    });
    polly.server.any().on("beforePersist", (_, recording) => {
      recording.request.headers =
        recording.request.headers.filter(
          h => h.name.toLowerCase() !== "authorization"
        );
    });
  });

  afterEach(async () => {
    await polly.stop();
  });

  it("Issueを作成する", async () => {
    const result = await createIssue("TanakaNatsumi625", "JavaScript-Ntanaka", "Test Issue", "テスト用のIssue", true, process.env.GITHUB_TOKEN);
    expect(result).toBeDefined();
    expect(result.title).toBe("Test Issue");
    expect(result.body).toBe("テスト用のIssue");
  });

  it("Issueを作成する（エラーケース）", async () => {
    polly.server
      .post('https://api.github.com/repos/TanakaNatsumi625/JavaScript-Ntanaka/issues')
      .intercept((req, res) => {
        res.status(400).json({ message: "Bad Request" });
      });
    
    await expect(createIssue("TanakaNatsumi625", "JavaScript-Ntanaka", "Test Issue", "テスト用のIssue", true, "dummy-token")).rejects.toThrow("GitHub API error! status: 400, message: {\"message\":\"Bad Request\"}");
  });
});

describe("Issueをクローズする", () => {
  let polly;

  beforeEach(() => {
    polly = new Polly("github-close-issue", {
      adapters: ["fetch"],
      persister: "fs",
      persisterOptions: {
        fs: {
          recordingsDir: "./ex02/recordings"
        }
      },
      recordIfMissing: true,
      recordFailedRequests: true,
      matchRequestsBy: {
        method: true,
        url: true,
        headers: false,
        body: true
      }
    });
    polly.server.any().on("beforePersist", (_, recording) => {
      recording.request.headers =
        recording.request.headers.filter(
          h => h.name.toLowerCase() !== "authorization"
        );
    });
  });

  afterEach(async () => {
    await polly.stop();
  });

  it("Issueをクローズする", async () => {
    // 事前にIssueを作成しておく
    // 今回は1というIssue番号をクローズすることにする。
    const result = await closeIssue("TanakaNatsumi625", "JavaScript-Ntanaka", 1, true, process.env.GITHUB_TOKEN);
    expect(result).toBeDefined();
    expect(result.state).toBe("closed");
    expect(result.number).toBe(1);
  });
  it("Issueをクローズする（エラーケース）", async () => {
    polly.server
      .patch('https://api.github.com/repos/TanakaNatsumi625/JavaScript-Ntanaka/issues/1')
      .intercept((req, res) => {
        res.status(404).json({ message: "Not Found" });
      });
    
    await expect(closeIssue("TanakaNatsumi625", "JavaScript-Ntanaka", 1, true, "dummy-token")).rejects.toThrow("GitHub API error! status: 404, message: {\"message\":\"Not Found\"}");
  });
});