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

  img.addEventListener("load", () => {
    const originalCanvas = document.getElementById("original");
    const filteredCanvas = document.getElementById("filtered");
    const originalCtx = originalCanvas.getContext("2d");
    const filteredCtx = filteredCanvas.getContext("2d");

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

    // ガウシアンフィルタ(5×5)
    //中心に近いピクセルほど重みが大きく、遠ざかるほど小さくなるように設定
    //5×5の重みは以下(https://www.mitani-visual.jp/mivlog/imageprocessing/gf3r89.php)
    const kernel = [
      [1, 4, 6, 4, 1],
      [4, 16, 24, 16, 4],
      [6, 24, 36, 24, 6],
      [4, 16, 24, 16, 4],
      [1, 4, 6, 4, 1]
    ];
    const kernelSum = kernel.reduce((sum, row) => sum + row.reduce((rowSum, value) => rowSum + value, 0), 0);
    // imageData の中身はそのままに別の配列に結果を格納する
    const outputData = new Uint8ClampedArray(imageData.data.length);
    console.log(outputData);
    // TODO: ここで imageData.data を参照して outputData に結果を格納
    const width = img.width;
    const height = img.height;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let r = 0, g = 0, b = 0;
        for (let ky = -2; ky <= 2; ky++) {
          for (let kx = -2; kx <= 2; kx++) {
            const weight = kernel[ky + 2][kx + 2];
            const px = Math.min(width - 1, Math.max(0, x + kx));
            const py = Math.min(height - 1, Math.max(0, y + ky));
            const index = (py * width + px) * 4;
            r += data[index] * weight;
            g += data[index + 1] * weight;
            b += data[index + 2] * weight;
          }
        } 
        const outputIndex = (y * width + x) * 4;
        outputData[outputIndex] = r / kernelSum;
        outputData[outputIndex + 1] = g / kernelSum;
        outputData[outputIndex + 2] = b / kernelSum;
        outputData[outputIndex + 3] = data[outputIndex + 3]; // アルファ値はそのまま
      }
    }
    const outputImageData = new ImageData(outputData, img.width, img.height);

    filteredCtx.putImageData(outputImageData, 0, 0);
    // ```

    // グレースケールへの変換 (RGB を足して平均を取っている)
    // for (let i = 0; i < data.length; i += 4) {
    //   const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    //   data[i] = avg;
    //   data[i + 1] = avg;
    //   data[i + 2] = avg;
    // }

    // filteredCtx.putImageData(imageData, 0, 0);
  });

  reader.readAsDataURL(file);
});
