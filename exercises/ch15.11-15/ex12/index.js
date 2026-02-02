const button = document.querySelector("#send-button");
const chatContainer = document.getElementById("chat-container");
const inputText = document.getElementById("input");

button.addEventListener("click", (e) => {
    e.preventDefault();
    button.disabled = true;//ボタンクリックしたら、非活性にする
    sendMessage();
});
async function sendMessage() {
    // 送信したいテキスト
    // 両端からホワイトスペースを取り除いた文字列を取得する
    const text = inputText.value.trim();
    if (text === "") {
        return;
    }
    //ユーザー側のメッセージの吹き出しを作る
    const userMessageElement = createMessageElement("user-message");
    userMessageElement.textContent = text;

    // Ai側の返答の吹き出しを作る
    const assistantMessageElement = createMessageElement("assistant-message");

    // Ollamaサーバーにメッセージを送信して応答を受け取る
    const url = "http://localhost:11434/api/chat";
    const model = "gemma:2b"; // 使用するモデル名を指定

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: model,
            messages: [
                {
                    role: "user",
                    content: text
                }
            ],
            //ストリーミングを有効にしておく
            //有効にしておくと、部分的な応答が逐次送られてくるため、ChatGPTのような応答が可能になる
            //逆に無効にすると、応答が全て揃ってから一括で送られてくる
            stream: true
        })
    });
    // ストリーミングで部分的に送られてくる応答を逐次処理するための準備
    // 例：「空はなぜ青いのか」→「空」「が」「青い」「理由」「は」「、」「化学」みたいな感じで返ってくる
    const reader = response.body.getReader();//getReader()でレスポンスbodyの中のデータの塊を要求できるようにする
    console.log("Response reader:", reader);
    const decoder = new TextDecoder("utf-8");//途中で文字が分断される可能性があるので、TextDecoderを使ってデコードする
    let assistantMessage = "";//全体の返答メッセージを入れる変数

    while (true) {
        // データの塊を1つ取得
        // value: Uint8Array, done: booleanみたいに返ってくる
        const { value, done } = await reader.read();
        console.log("Chunk received:", value, done);
        //データがもう無い場合、つまりdoneがtrueの時はループを抜ける
        if (done) break;
        //valueがUint8Array形式で来るので、TextDecoderで文字列に変換する
        // ここでようやく「"message":{"role":"assistant","content":"な"},"done":false}」みたいになる
        const chunk = decoder.decode(value, { stream: true });
        console.log("Decoded chunk:", chunk);
        // ここでは JSON ラインごとに分割して処理する
        // 1チャンクは1JSONとは限らない。JSONが複数行にまたがることもあるし、1行に複数のJSONが含まれることもある
        // しかし、Ollamaのストリーミングは改行JSONなので、\nで分割して処理をする
        chunk.split("\n").forEach(line => {//改行ごとに分割し、
            if (line.trim().startsWith("{")) {//空行でなく、かつ{で始まる行だけ処理する
                try {
                    const parsed = JSON.parse(line);//JSONをパースする
                    console.log("Parsed chunk:", parsed);
                    // assistantのメッセージ部分を取り出して表示する
                    const content = parsed.message?.content;
                    if (content) {
                        assistantMessage += content;
                        assistantMessageElement.textContent = assistantMessage;
                        chatContainer.scrollTop = chatContainer.scrollHeight;
                    }

                    if (parsed.done) {
                        console.log("Streaming done");
                        button.disabled = false;//メッセージ受け取ったら、ボタンを活性にする
                    }
                } catch (e) {
                    console.error("JSON parse error", e, line);
                }
            }
        });
    }

    console.log("Final assistant message:", assistantMessage);

}

// メッセージをチャットコンテナに追加する関数
function createMessageElement(className) {
    const messageElement = document.createElement("div");
    messageElement.className = className;
    chatContainer.appendChild(messageElement);
    // メッセージ追加後にスクロールを一番下に移動
    chatContainer.scrollTop = chatContainer.scrollHeight;
    return messageElement;
}
