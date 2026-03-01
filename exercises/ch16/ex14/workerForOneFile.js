import path from "path";
import { fileURLToPath } from "url";
import * as threads from "worker_threads";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (threads.isMainThread) {
    // メインスレッド
    // やること：画像読み込み・描画・ワーカーに imageData・ワーカースレッドの管理
    const inputImage = './input.jpg';  // 入力画像のパス
    const outputImage = './output.jpg'; // 出力画像のパス

    processImage(inputImage, outputImage);

    async function processImage(inputPath, outputPath) {
      try {
        console.log(`画像を読み込み中: ${inputPath}`);
        
        // 画像を読み込み
        const img = await loadImage(inputPath);
        
        // Canvas を作成して画像を描画
        const canvas = createCanvas(img.width, img.height);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        
        // ImageData を取得
        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        console.log(`画像サイズ: ${img.width}x${img.height}`);
        
        // ガウスフィルターを適用
        const filteredImageData = await applyGaussianFilter(imageData);
        
        // 結果を新しい Canvas に描画
        const outputCanvas = createCanvas(img.width, img.height);
        const outputCtx = outputCanvas.getContext('2d');
        outputCtx.putImageData(filteredImageData, 0, 0);
        
        // JPEG として保存
        const buffer = outputCanvas.toBuffer('image/jpeg');
        fs.writeFileSync(outputPath, buffer);
        
        console.log(`フィルター適用完了: ${outputPath}`);
        
      } catch (error) {
        console.error('エラーが発生:', error);
      }
    }

    function applyGaussianFilter(imageData) {
        return new Promise((resolve, reject) => {
            const worker = new threads.Worker(__filename);

            // ワーカーにimageDataを送信
            worker.postMessage({
                data: imageData.data,
                width: imageData.width,
                height: imageData.height
            });

            // ワーカーからの結果を受信
            worker.on('message', (result) => {
                const outputImageData = new ImageData(
                    new Uint8ClampedArray(result),
                    imageData.width,
                    imageData.height
                );
                resolve(outputImageData);
                worker.terminate();
            });

            worker.on('error', (err) => {
                reject(err);
                worker.terminate();
            });
        });
    }
} else {
    // ワーカースレッド
    // やること：imageData.data に対してガウスフィルター計算・結果をメインスレッドに返す
    threads.parentPort.on('message', ({ data, width, height }) => {
        // ガウシアンフィルタ(5×5)
        // 中心に近いピクセルほど重みが大きく、遠ざかるほど小さくなるように設定
        const kernel = [
            [1, 4, 6, 4, 1],
            [4, 16, 24, 16, 4],
            [6, 24, 36, 24, 6],
            [4, 16, 24, 16, 4],
            [1, 4, 6, 4, 1]
        ];
        const kernelSum = kernel.reduce((sum, row) =>
            sum + row.reduce((rowSum, value) => rowSum + value, 0), 0
        );

        // imageData の中身はそのままに別の配列に結果を格納する
        const outputData = new Uint8ClampedArray(data.length);

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let r = 0, g = 0, b = 0;

                // 5x5カーネルを適用
                for (let ky = -2; ky <= 2; ky++) {
                    for (let kx = -2; kx <= 2; kx++) {
                        const weight = kernel[ky + 2][kx + 2];
                        // 境界を超えない範囲でピクセル座標を計算
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

        // 結果をメインスレッドに送信
        threads.parentPort.postMessage(outputData.buffer);
    });
}