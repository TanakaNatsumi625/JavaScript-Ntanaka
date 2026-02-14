import { spawn } from "child_process";
import path from "path";

// ESMでこのファイルの絶対パスとして__dirnameを定義するイディオム
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// startChildで起動したプロセスの参照
let child = null;

// node ./child.js を起動し、このプロセスが終了したときに解決するPromiseを返す
// cf. https://nodejs.org/api/child_process.html#event-close
async function startChild() {
  const childPath = path.join(__dirname, "child.js");
  // spawnは子プロセスを起動する関数。第一引数はコマンド、第二引数はコマンドの引数の配列
  // 子プロセスのPIDが作られる＝後々killするための参照ができる
  child = spawn("node", [childPath]);

  // 結果を受け取る(標準出力)
  child.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  // エラーを受け取る(標準エラー出力)
  child.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  return new Promise((res) => {
    child.on("close", (code, signal) => {
      res([code, signal]);
    });
  });
}

// TODO: ここに処理を書く
async function main() {
  // シグナルを2種類以上トラップして、子プロセスを終了させるときに子プロセスも終了するようにする
  // シグナルの種類：SIGINT(ユーザーによる終了要求), SIGTERM(強制終了), SIGHUP(接続切断)など
  // シグナル…OSからプロセスに送られる合図
  const signals = ["SIGINT", "SIGTERM"];
  signals.forEach((signal) => {
    process.on(signal, () => {
      console.log(`Received ${signal}. Exiting...`);
      // 子プロセスが存在する場合(子プロセスから応答あり)は、子プロセスにもシグナルを送る
      if (child) {
        // 子プロセスにシグナルを送る
        // killはプロセスにシグナルを送る関数(即死させているわけじゃない)。第一引数はシグナルの種類
        child.kill(signal); 
      }
    });
  });
  
   while (true) {
     const [code, signal] = await startChild();
    console.log(`child process exited with code ${code} and signal ${signal}`);

    if (code === 0) {//今回codeが0の時はないが、正常終了として書いておく
      console.log("child process exited successfully. Restarting...");
      break; 
    }
    if (signal) {
      console.log(`child process was killed with signal ${signal}`);
      // シグナルによる終了の場合は、再起動しない
      process.exit(0); // 正常終了
    }
    if (code !== 0) {
      console.log("child process exited with an error. Restarting...");
      await new Promise((res) => setTimeout(res, 1000)); // 1秒待ってから再起動
    }
  }
}

main();

// 以下コンソール結果
// stdout: child processing...

// stdout: child processing...

// stdout: An error occurred. Exiting...

// child process exited with code 1 and signal null←エラーが返ってきた
// child process exited with an error. Restarting...
// Received SIGINT. Exiting...

// Received SIGINT. Exiting...
// child process exited with code null and signal SIGINT←Ctrl+Cしたときの結果
// child process was killed with signal SIGINT