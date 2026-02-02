"use strict";

const button = document.querySelector("#send-button");
const messageContainer = document.getElementById("message-container");
button.addEventListener("click", (e) => {
  e.preventDefault();
   button.disabled = true;//ボタンクリックしたら、非活性にする
  getMessageFromServer();
});
async function getMessageFromServer() {
  const messageElement = document.createElement("div");
  messageElement.className = "message";
  messageElement.textContent = "";
  messageContainer.appendChild(messageElement);

  // TODO: ここにサーバーとのやり取り等を実装しなさい
  // EventSource を使って新着メッセージの通知を受け取るようにする。
  let eventSource= new EventSource("http://localhost:3000/message");

  eventSource.onmessage = function(event) {//メッセージが届いたら
    console.log("Message received:", event.data);
    const data = JSON.parse(event.data);
    messageElement.textContent += data.value;
    button.disabled = false;//メッセージ受け取ったら、ボタンを活性にする
    if(data.done){
      eventSource.close(); // メッセージを受け取ったら接続を閉じる
    }
  };

  eventSource.onerror = function(err) {//エラーだったら
    console.error("EventSource failed:", err);
    messageElement.textContent = '通信ができなかったよ';
    button.disabled = false;//エラーでも、ボタンを活性にする
    eventSource.close();
  };

}
