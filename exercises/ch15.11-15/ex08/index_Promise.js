const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const ws = new WebSocket("ws://localhost:3003");

  const requestMessages = [];
  for (let i = 1; i <= 3; i++) {
    const input = document.querySelector(`#payload${i}`);
    const payload = input.value.trim();
    if (!payload) continue;

    requestMessages.push({
      requestId: i,
      type: "request",
      payload,
    });
  }

  ws.addEventListener("open", async () => {
    for (const message of requestMessages) {
      const responseElem = document.querySelector(
        `#response${message.requestId}`
      );
      responseElem.textContent = "Loading...";

      sendRequest(ws, message)
        .then((payload) => {
          responseElem.textContent = payload;
        })
        .catch((err) => {
          responseElem.textContent = `Error: ${err.message}`;
        });
    }
  });
});

function sendRequest(ws, message, timeoutMs = 3000) {
  return new Promise((resolve, reject) => {
    const requestId = message.requestId;

    // タイムアウト（reject）
    const timerId = setTimeout(() => {
      cleanup();
      reject(new Error("Timeout"));
    }, timeoutMs);

    // message handler
    const onMessage = (event) => {
      let data;
      try {
        data = JSON.parse(event.data);
      } catch {
        return;
      }

      if (data.requestId !== requestId) return;

      cleanup();

      if (data.type === "response") {
        resolve(data.payload);
      } else if (data.type === "error") {
        reject(new Error(data.payload));
      }
    };

    function cleanup() {
      clearTimeout(timerId);
      ws.removeEventListener("message", onMessage);
    }

    ws.addEventListener("message", onMessage);

    // 送信
    ws.send(JSON.stringify(message));
  });
}
