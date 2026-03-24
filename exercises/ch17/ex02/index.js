#!/usr/bin/env node
// package.json の "bin" フィールドを使って、コマンドラインツールを作成する。
// npm link を実行して、gh-issueコマンドを使えるようにする(コマンド自作できる)
// 参考：https://qiita.com/toshi-toma/items/ea76b8894e7771d47e10
import { listIssues, createIssue, closeIssue } from "./issueLib.js";
import { gitHubAPIRequest } from "./gitHubApi.js";

// GitHubのアクセストークンはPSの環境変数に設定
// $Env:GITHUB_TOKEN="ghp_xxxxxxxxx"
const TOKEN = process.env.GITHUB_TOKEN;
const command = process.argv[2]; // コマンドは3番目の要素
if (!TOKEN) {
    console.error("Error: GITHUB_TOKEN environment variable is not set.");
    process.exit(1);
}

// 入力されたコマンドの中に特定のフラグ(オプション)があるかどうかをチェックする関数
function hasFlag(flag) {
    return process.argv.includes(flag);
}

// ヘルプオプションがあるかどうかをチェック
if (hasFlag("--help") || hasFlag("-h")) {
    showHelp();
    process.exit(0);
}
// コマンドライン引数からオプションの値を取得する関数
function getOptionValue(flag) {
    const index = process.argv.indexOf(flag);
    if (index !== -1 && index + 1 < process.argv.length) {
        return process.argv[index + 1];
    }
    return null;
}

// verboseオプションがあるかどうかをチェック
const verbose = hasFlag("--verbose") || hasFlag("-v");

async function main() {
    // サブコマンドに応じて処理を分岐する
    if (command === "list") {
        // 参考：https://docs.github.com/ja/rest/issues/issues?apiVersion=2022-11-28#list-issues-assigned-to-the-authenticated-user
        console.log("Issueの一覧を表示します");
        // ここでGitHub APIを呼び出してオープンな Issue の Id と Title を取得し、表示する処理を書く
        // オプション確認
        const repo = getOptionValue("-r");
        if (!repo) {
            throw new Error("Missing -r owner/repo");
        }
        // owner/repo 形式でリポジトリを指定することを想定しているため、スラッシュで分割してオーナーとリポジトリ名を取得する
        const [owner, repoName] = repo.split("/");
        console.log(`Fetching issues for ${owner}, ${repoName}...`);
        if (!owner || !repoName) {
            throw new Error("Invalid repo format. Use owner/repo");
        }
        // GitHub APIからIssueの一覧を取得
        const issues = await listIssues(owner, repoName, verbose, TOKEN);
        console.log(JSON.stringify(issues, null, 2));
        // もし何もなかったら"No open issues"と表示して終了する
        if (issues.length === 0) {
            console.log("No open issues");
            return;
        }
        for (const issue of issues) {
            console.log(`#${issue.number} ${issue.title}`);
        }

    } else if (command === "create") {
        console.log("Issueを作成します");
        // ここでGitHub APIを呼び出してIssueを作成する処理を書く
        // 参考：https://docs.github.com/ja/rest/issues/issues?apiVersion=2022-11-28#create-an-issue

        const repo = getOptionValue("-r");
        const title = getOptionValue("-t");
        const body = getOptionValue("-b") || "";
        if (!repo || !title) {
            throw new Error("Missing required options: -r owner/repo -t title");
        }
        const [owner, repoName] = repo.split("/");
        if (!owner || !repoName) {
            throw new Error("Invalid repo format. Use owner/repo");
        }
        const issue = await createIssue(owner, repoName, title, body, verbose, TOKEN);
        console.log(`Created issue #${issue.number}: ${issue.title}`);
        
    } else if (command === "close") {
        console.log("Issueをクローズします");
        // ここでGitHub APIを呼び出してIssueをクローズする処理を書く
        // 参考：https://docs.github.com/ja/rest/issues/issues?apiVersion=2022-11-28#update-an-issue
        
        const repo = getOptionValue("-r");
        const issueNumber = getOptionValue("-i");
        if (!repo || !issueNumber) {
            throw new Error("Missing required options: -r owner/repo -i issue_number");
        }
        const [owner, repoName] = repo.split("/");
        if (!owner || !repoName) {
            throw new Error("Invalid repo format. Use owner/repo");
        }
        const issue = await closeIssue(owner, repoName, issueNumber, verbose, TOKEN);
        console.log(`Closed issue #${issue.number}: ${issue.title}`);
    } else if (command === "me") {
        console.log("自分の情報を表示します");
        // ここでGitHub APIを呼び出して自分の情報を取得し、表示する処理を書く
        // これはテスト用
        const me = await gitHubAPIRequest("/user", "GET", null, verbose, TOKEN);
        console.log("Authenticated as:", me.login);

    } else {
        console.error("Unknown command. Use --help to see available commands.");
        showHelp();
        process.exit(1);
    }
}

// ヘルプコマンド用に表示する関数
function showHelp() {
    console.log(`
Usage: gh-issue <command> [options] 
Commands:
  list          Issueの一覧を表示します
    Required options: -r owner/repo
  create        Issueを作成します
    Required options: -r owner/repo -t title
    Optional options: -b body
  close         Issueをクローズします
    Required options: -r owner/repo -i issue_number

Options:
  -h, --help    ヘルプを表示します
  -v, --verbose 詳細なログを表示します
`);
}

main().catch(err => {
    console.error("Error:", err.message);
    process.exit(2);
});

// console.log("gh-issue CLI 起動");
// console.log(process.argv);
// // 変数の中身
// // [
// //   'C:\\Users\\r00000625\\AppData\\Local\\fnm_multishells\\18876_1772455752503\\node.exe'→Node本体,
// //   'C:\\Users\\r00000625\\AppData\\Local\\fnm_multishells\\18876_1772455752503\\node_modules\\ex08\\index.js'→実際の実行ファイル,
// //   'list'→ユーザー入力の引数(サブコマンド)
// // ]

// console.log(process.argv[2]);
// console.log(process.argv[3]);

// const [, , firstArg] = process.argv;

// if (!firstArg) {
//     console.error("Please pass one argument!!");
//     process.exit(1);
// }

// const msg = `
//   Hello!! ${firstArg} san.
//   I am Toshihisa Tomatsu.
//   GitHub: https://github.com/toshi-toma
//   Twitter: https://twitter.com/toshi__toma
// `;

// console.log(msg);


// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// rl.question("Please enter names for your project: ", answer => {
//   console.log(`Thank you!! Let's start ${answer}`);

//   rl.close();
// });
