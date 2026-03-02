const threads = require("worker_threads");

if (threads.isMainThread) {
    // sharedArray を number 型の変数 num にする
    let num = 0;

    // ここでワーカースレッドを作成し、共有配列をworkerData の初期値
    // として渡して、面倒なメッセージの送受信を行わないようにする。
    let worker = new threads.Worker(__filename);

    worker.on("online", () => {
        for (let i = 0; i < 10_000_000; i++) {
            num++; // メインスレッドの for ループで Atomic.add の代わりに num をインクリメントする
        }
        worker.on("message", (message) => {
            if (message === "increment") {
                num++;
            } else if (message === "done") {
                // 両方のスレッドが終了したら、スレッドセーフな関数を使って
                // 共有配列を読み込み、期待通りの20,000,000 という値になって
                // いることを確認する。
                console.log(num);
            }
        });
    });
} else {
    for (let i = 0; i < 10_000_000; i++) {
        // サブスレッドの for ループで Atomic.add の代わりにメインスレッドに
        // "num をインクリメントせよ"というメッセージを送り、メインスレッドでは
        // そのメッセージを受信したら num をインクリメントする
        threads.parentPort.postMessage("increment"); 
    }
    threads.parentPort.postMessage("done");
}