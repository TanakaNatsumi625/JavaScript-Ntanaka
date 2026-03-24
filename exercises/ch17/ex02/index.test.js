import { describe, it, jest } from "@jest/globals";

// トークンなどはダミーを用意する
const mockOwner = "dummyOwner";
const mockRepo = "dummyRepo";
const mockToken = "dummyToken";

// 実際のGitHub API呼び出しをモックする
// jest.mock()を使いたかったが、CommonJSが前提となっているため、jest.unstable_mockModuleを使う
// https://jestjs.io/docs/ecmascript-modules
jest.unstable_mockModule("./gitHubApi.js", () => ({
    gitHubAPIRequest: jest.fn()
}));

// テスト対象のモジュールをインポートする
// モックを先に定義してからインポートする必要があるため、import()を使って動的にインポートする
const { listIssues, createIssue, closeIssue } = await import("./issueLib.js");
const { gitHubAPIRequest } = await import("./gitHubApi.js");

describe("Issueの一覧を表示する", () => {
     beforeEach(() => {
        jest.clearAllMocks();
    });
    it("GitHub APIからIssueの一覧を取得して表示する", async () => {
        // モックの戻り値を設定
        const mockIssues = [
            { number: 1, title: "Issue 1" },
            { number: 2, title: "Issue 2" }
        ];
        // https://jestjs.io/ja/docs/mock-function-api#mockfnmockresolvedvaluevalue
        gitHubAPIRequest.mockResolvedValue(mockIssues);

        const result = await listIssues(mockOwner, mockRepo, false, mockToken);
        // GitHub APIが正しい引数で呼び出されたことを確認する
        expect(gitHubAPIRequest).toHaveBeenCalledWith(
            `/repos/${mockOwner}/${mockRepo}/issues`,
            "GET",
            null,
            false,
            mockToken
        );
        // 戻り値がモックのIssueの一覧であることを確認する
        expect(result).toEqual(mockIssues);

    });
    it("verbose モードでIssueの一覧を取得する", async () => {
        const mockIssues = [
            { number: 1, title: "Issue 1" },
            { number: 2, title: "Issue 2" }
        ];
        gitHubAPIRequest.mockResolvedValue(mockIssues);
        const result = await listIssues(mockOwner, mockRepo, true, mockToken);
        
        // verboseフラグがtrueで正しく渡されているかを確認
        expect(gitHubAPIRequest).toHaveBeenCalledWith(
            `/repos/${mockOwner}/${mockRepo}/issues`,
            "GET",
            null,
            true, // verboseモードが有効であることを確認
            mockToken
        );
        expect(result).toEqual(mockIssues);
    });

    it("Issueがない場合は空の配列を返す", async () => {
        gitHubAPIRequest.mockResolvedValue([]);
        const result = await listIssues(mockOwner, mockRepo, false, mockToken);
        expect(result).toEqual([]);
    });
    it("GitHub APIがエラーを返した場合は例外をスローする", async () => {
        gitHubAPIRequest.mockRejectedValue(new Error("GitHub API error"));
        await expect(listIssues(mockOwner, mockRepo, false, mockToken)).rejects.toThrow("GitHub API error");
    });
});

describe("Issueを作成する", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("GitHub APIを呼び出してIssueを作成する", async () => {
        const mockIssue = { number: 3, title: "New Issue" };
        gitHubAPIRequest.mockResolvedValue(mockIssue);
        const result = await createIssue(mockOwner, mockRepo, "New Issue", "Issue body",false, mockToken);
        expect(gitHubAPIRequest).toHaveBeenCalledWith(
            `/repos/${mockOwner}/${mockRepo}/issues`,
            "POST",
            { title: "New Issue", body: "Issue body" },
            false,
            mockToken
        );
        expect(result).toEqual(mockIssue);
    });
    it("verbose モードでIssueを作成する", async () => {
        const mockIssue = { number: 3, title: "New Issue" };
        gitHubAPIRequest.mockResolvedValue(mockIssue);
        const result = await createIssue(mockOwner, mockRepo, "New Issue", "Issue body", true, mockToken);
        expect(gitHubAPIRequest).toHaveBeenCalledWith(
            `/repos/${mockOwner}/${mockRepo}/issues`,
            "POST",
            { title: "New Issue", body: "Issue body" },
            true,
            mockToken
        );
        expect(result).toEqual(mockIssue);
    });
    it("GitHub APIがエラーを返した場合は例外をスローする", async () => {
        gitHubAPIRequest.mockRejectedValue(new Error("GitHub API error"));
        await expect(createIssue(mockOwner, mockRepo, "New Issue", "Issue body", false, mockToken)).rejects.toThrow("GitHub API error");
    });
});

describe("Issueを閉じる", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("GitHub APIを呼び出してIssueを閉じる", async () => {
        const mockIssue = { number: 3, title: "New Issue", state: "closed" };
        gitHubAPIRequest.mockResolvedValue(mockIssue);
        const result = await closeIssue(mockOwner, mockRepo, 3, false, mockToken);
        expect(gitHubAPIRequest).toHaveBeenCalledWith(
            `/repos/${mockOwner}/${mockRepo}/issues/3`,
            "PATCH",
            { state: "closed" },
            false,
            mockToken
        );
        expect(result).toEqual(mockIssue);
    });
        it("verbose モードでIssueを閉じる", async () => {
        const mockIssue = { number: 3, title: "New Issue", state: "closed" };
        gitHubAPIRequest.mockResolvedValue(mockIssue);
        const result = await closeIssue(mockOwner, mockRepo, 3, true, mockToken);
        expect(gitHubAPIRequest).toHaveBeenCalledWith(
            `/repos/${mockOwner}/${mockRepo}/issues/3`,
            "PATCH",
            { state: "closed" },
            true,
            mockToken
        );
        expect(result).toEqual(mockIssue);
    });
    it("GitHub APIがエラーを返した場合は例外をスローする", async () => {
        gitHubAPIRequest.mockRejectedValue(new Error("GitHub API error"));
        await expect(closeIssue(mockOwner, mockRepo, 3, false, mockToken)).rejects.toThrow("GitHub API error");
    });
});
