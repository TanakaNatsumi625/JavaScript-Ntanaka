const { Worker, isMainThread, parentPort } = require("worker_threads");
const { createCanvas, loadImage, ImageData } = require("canvas");
const fs = require("fs");

// const __filename = path.resolve(__filename);
// const inputImage = './input.jpg';  // 入力画像のパス
// const outputImage = './output.jpg'; // 出力画像のパス

if (isMainThread) {
    module.exports = function applyGaussianFilter(inputPath, outputPath) {
        try {
            return new Promise(async (resolve, reject) => {
                // 画像を読み込み
                const img = await loadImage(inputPath);

                // Canvas を作成して画像を描画
                const canvas = createCanvas(img.width, img.height);
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);

                // ImageData を取得
                const imageData = ctx.getImageData(0, 0, img.width, img.height);
                console.log(`画像サイズ: ${img.width}x${img.height}`);

                // ワーカースレッドを作成
                const worker = new Worker(__filename);

                // ワーカーにimageDataを送信
                worker.postMessage({
                    inputBuffer: imageData.data.buffer,
                    width: img.width,
                    height: img.height
                }, [imageData.data.buffer]);

                // ワーカーからの結果を受信
                worker.on('message', (result) => {
                    const outputData = new Uint8ClampedArray(result);
                    const outputImageData = new ImageData(outputData, img.width, img.height);
                    ctx.putImageData(outputImageData, 0, 0);
                    const buffer = canvas.toBuffer('image/jpeg');
                    fs.writeFileSync(outputPath, buffer);
                    resolve();
                });

                worker.on('error', (err) => {
                    reject(err);
                });

            });
        } catch (error) {
            console.error('エラーが発生:', error);
            throw error;
        }
    }
} else {
    // ワーカースレッド
    // やること：data に対してガウスフィルター計算・結果をメインスレッドに返す
    parentPort.on('message', ({ inputBuffer, width, height }) => {
        // inputBuffer は 通信のためTransferable Object として受け取るため、ArrayBuffer 形式で受け取る
        // ので、入力データを復元する
        const data = new Uint8ClampedArray(inputBuffer);
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
        const outputData = new Uint8ClampedArray(data.length);

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
        // 結果をメインスレッドに返す
        parentPort.postMessage(outputData.buffer, [outputData.buffer]);
    });
}