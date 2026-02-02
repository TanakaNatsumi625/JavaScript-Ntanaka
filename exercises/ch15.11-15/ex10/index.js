document.getElementById("image").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) {
    return;
  }

  const img = new Image();
  const reader = new FileReader();

  reader.addEventListener("load", (e) => {
    img.src = e.target.result;
  });

  // WebOSocketでサーバー疎接続する
  const ws = new WebSocket("ws://localhost:3003");
  // 画像が読み込まれたらキャンバスに描画し、ピクセルデータを取得してサーバーに送信
  img.addEventListener("load", () => {
    // キャンバスの準備
    const originalCanvas = document.getElementById("original");
    const filteredCanvas = document.getElementById("filtered");
    // キャンバスを使うためのコンテキストを取得
    const originalCtx = originalCanvas.getContext("2d");
    const filteredCtx = filteredCanvas.getContext("2d");
    // キャンバスの大きさを決定
    originalCanvas.width = img.width;
    originalCanvas.height = img.height;
    filteredCanvas.width = img.width;
    filteredCanvas.height = img.height;

    originalCtx.drawImage(img, 0, 0);
    //getImageData() メソッドは、キャンバスの指定した矩形領域のピクセルデータを取得する
    //各ピクセルは RGBA の 4 つの成分で表され、各成分は 0 から 255 の範囲の整数値で表される
    const imageData = originalCtx.getImageData(0, 0, img.width, img.height);
    console.log(imageData);
    // imageData オブジェクトの data プロパティは、ピクセルデータを格納する Uint8ClampedArray 
    const data = imageData.data;
    console.log(data);
    // WebSocketの接続が開いたら画像データをサーバーに送信
    ws.addEventListener("open", () => {
      console.log("websocket status:", ws.readyState);
      // サーバーに画像データを送信
      const message = {
        type: "Gauss",
        payload: {
          image: {
            width: img.width,
            height: img.height,
            data: Array.from(data) // Uint8ClampedArray を通常の配列に変換
          }
        }
      };
      ws.send(JSON.stringify(message));
    });
// サーバーからメッセージを受信したら表示
    ws.addEventListener("message", (event) => {
      const response = JSON.parse(event.data);
      console.log("Received data:", response);
      // サーバーから受信した画像データをキャンバスに描画するための設定値を作成
      if (response.type === "Gauss") {
        const outputImageData = new ImageData(
          new Uint8ClampedArray(response.payload.image.data),
          response.payload.image.width,
          response.payload.image.height
        );
        // キャンバスに描画
        filteredCtx.putImageData(outputImageData, 0, 0);
      }
    });
    
  });

  reader.readAsDataURL(file);
});
