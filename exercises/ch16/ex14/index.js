import { createCanvas, loadImage, ImageData } from 'canvas';
import fs from 'fs';
import { applyGaussianFilter } from './worker.js';

async function processImage(inputPath, outputPath) {
    try {
        console.log("カレントディレクトリ:", process.cwd());
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

const inputImage = './input.jpg';  // 入力画像のパス
const outputImage = './output.jpg'; // 出力画像のパス

processImage(inputImage, outputImage);