const originalCanvas = document.getElementById("original");
const filteredCanvas = document.getElementById("filtered");
const originalCtx = originalCanvas.getContext("2d");
const filteredCtx = filteredCanvas.getContext("2d");
// ワーカースレッドを作成
const worker = new Worker("./worker.js", { type: "module" });

document.getElementById("image").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) {
        return;
    }

    const img = new Image();

    img.addEventListener("load", () => {
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

        //ワーカーへ送信
        worker.postMessage({
            inputBuffer: data.buffer,
            width: img.width,
            height: img.height
        }, [data.buffer]);

    });

    // FileReader を使用して画像ファイルを読み込む
    const reader = new FileReader();
    reader.addEventListener("load", (e) => {
        img.src = e.target.result;
    });
    reader.readAsDataURL(file);
});


// ワーカーからの結果を受け取って描画
worker.addEventListener("message", (e) => {
  const { width, height, buffer } = e.data;

  const outputData = new Uint8ClampedArray(buffer);
  const outputImageData = new ImageData(outputData, width, height);
  filteredCanvas.width = width;
  filteredCanvas.height = height;
  filteredCtx.putImageData(outputImageData, 0, 0);
});

worker.addEventListener("error", (err) => {
  console.error("Worker error:", err);
});
