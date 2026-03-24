import { gitHubAPIRequest } from "./gitHubApi.js";

// Issueの一覧を取得する関数
export async function listIssues(owner, repo, verbose = false, token) {
    return await gitHubAPIRequest(
        `/repos/${owner}/${repo}/issues`,
        "GET",
        null,
        verbose,
        token
    );
}

// Issueを作成する関数
export async function createIssue(owner, repo, title, body, verbose = false, token) {
    return await gitHubAPIRequest(
        `/repos/${owner}/${repo}/issues`,
        "POST",
        {
            title,
            body
        },
        verbose,
        token
    );
}

// Issueをクローズする関数
export async function closeIssue(owner, repo, issueNumber, verbose = false, token) {
    return await gitHubAPIRequest(
        `/repos/${owner}/${repo}/issues/${issueNumber}`,
        "PATCH",
        {
            state: "closed"
        },
        verbose,
        token
    );
}