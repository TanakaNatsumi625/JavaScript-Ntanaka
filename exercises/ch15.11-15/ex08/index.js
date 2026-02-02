const form = document.querySelector("#requests");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Form submitted");

    //  まずはリクエストメッセージを格納する配列を用意する
    const requestMessages = [];
    const requestNum = 3;
    for (let i = 1; i <= requestNum; i++) {
        const input = document.querySelector(`#payload${i}`);
        const payload = input.value.trim();
        //入力がないペイロードはスキップ
        if (payload.length === 0) continue;

        requestMessages.push({
            requestId: i,
            type: "requst",
            payload: payload
        });
    }
    // 全く入力が無い場合はアラートを表示して終了する
    if (requestMessages.length === 0) {
        alert("少なくとも1つのペイロードを入力してください");
        return;
    }
    
    // WebSocketでサーバと接続し、メッセージを送受信する
    const ws = new WebSocket("ws://localhost:3003");
    console.log("websocket status:", ws.readyState);

    // レスポンスの状態を管理するためのMapを用意する
    // pending=処理中、done=完了、error=エラー、timeout=タイムアウト(3秒)
    const responseStatus = new Map();
    //接続されたら
    //メッセージを送信する→ここは教科書通り
    ws.addEventListener("open", () => {
        console.log("websocket status:", ws.readyState)
        for (const message of requestMessages) {
            const requestId = message.requestId;
            //  状態がpendingの時ローディングを開始する→レスポンスNごとに"Loading..."と表示する
            // なぜなら、WebSocketは非同期で動作するため、必ずしも送信した順番でレスポンスが返ってくるとは限らないから
            // あるパターンでは２→３→１の順で返ってきた
            const responseElem = document.querySelector(`#response${requestId}`);
            responseElem.textContent = "Loading...";

            // タイムアウトを設定する
            const timerId = setTimeout(() => {
                const state = responseStatus.get(requestId);
                // すでに完了していたら何もしない
                if (!state || state.status !== "pending") {
                    return;
                }
                state.status = "timeout";
                // id=responseNの要素にタイムアウトメッセージを表示する
                responseElem.textContent = "Error: Request timed out";

            }, 3000);
            // Mapに状態を登録する
            responseStatus.set(requestId, { status: "pending", timerId: timerId });
            // メッセージを送信する
            const messageStr = JSON.stringify(message);
            console.log("Sending message:", messageStr);
            ws.send(messageStr);
        }
    });
    //サーバからメッセージを受信したら→これも教科書通り
    ws.addEventListener("message", (event) => {
        const responseData = JSON.parse(event.data);
        console.log("Received data:", responseData);
        const { requestId, type, payload } = responseData;
        // リクエストの状態を確認する
        const state = responseStatus.get(requestId);
        // 1.状態が存在しなかったり、pendingでなければ無視する→タイムアウト済み無視
        if (!state || state.status !== "pending") {
            console.log(`Ignoring response for requestId ${requestId} with status ${state ? state.status : 'unknown'}`);
            return;
        }
        // タイマーを解除する
        clearTimeout(state.timerId);

        const responseElem = document.querySelector(`#response${responseData.requestId}`);
        // 2.タイムアウトではない場合
        // 正常時
        if (state.status === "pending") {
            // 状態をdoneに更新する
            state.status = "done";
            // id=responseNの要素にレスポンスを表示する
            responseElem.textContent = responseData.payload;
        }else if (type === "error") {
            // エラー時
            state.status = "error";
            // id=responseNの要素にエラーメッセージを表示する
            responseElem.textContent = `Error: ${payload}`;
        }
    });
    //接続が閉じられたら
    ws.addEventListener("close", () => {
        console.log("websocket status:", ws.readyState)
        // すべてのリクエストの状態を確認し、pendingのものがあればエラー扱いにする
        for (const [requestId, state] of responseStatus) {
            if (state.status === "pending") {
                state.status = "error";
                const responseElem = document.querySelector(`#response${requestId}`);
                responseElem.textContent = "Error: Connection closed";
            }
        }
        console.log("WebSocket connection closed");
    });
});

// // ローディング画面を表示する
// 以下は全体のローディング表示を制御する関数だが、今回はレスポンスごとに表示するので使わない
// function setLoading(isLoading) {
//     if(isLoading) {
//         // id=response1の要素に"Loading..."と表示する
//         for (let i = 1; i <= 3; i++) {
//             const responseElem = document.querySelector(`#response${i}`);
//             responseElem.textContent = "Loading...";
//         }
//     } else {
//         // id=response1の要素の中身を空にする
//         for (let i = 1; i <= 3; i++) {
//             const responseElem = document.querySelector(`#response${i}`);
//             responseElem.textContent = "";
//         }
//     }
// }
