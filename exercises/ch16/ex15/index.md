- メッセージパッシングによって排他制御処理相当を行う並行処理モデルを何と呼ぶか
    - 参考：https://zenn.dev/kuramapommel/articles/self-study_actor-model-using-akka
    - アクターモデルという
    - お互いのスレッドがmessageを非同期に送り合うことで並行処理を実現する
    - メッセージを送られたアクターは、メッセージごとの振る舞いを実施する
    - アクターが持つ4つの操作
        - 生成：別のアクター(ワーカー)を作り親子関係になる
            ```js
            // ここでワーカースレッドを作成し、共有配列をworkerData の初期値
            // として渡して、面倒なメッセージの送受信を行わないようにする。
            let worker = new threads.Worker(__filename);
            ```
        - 送信：別のアクターにメッセージを送ることができる
            ```js
            for (let i = 0; i < 10_000_000; i++) {
                // サブスレッドの for ループで Atomic.add の代わりにメインスレッドに
                // "num をインクリメントせよ"というメッセージを送り、メインスレッドでは
                // そのメッセージを受信したら num をインクリメントする
                threads.parentPort.postMessage("increment"); 
            }
            threads.parentPort.postMessage("done");
            ```
        - 状態変化：メッセージに合わせて振る舞い、自分自身の状態を変化させる
            ```js
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
            ```
        - 監督：アクターは自身の子アクターを監督する責任があり、子アクターに異常が発生した場合に適した対策を行う
    - Nodeのほかに、Go(マルチスレッドと言えばよく出てくる言語)などが良く対比で出てきていた