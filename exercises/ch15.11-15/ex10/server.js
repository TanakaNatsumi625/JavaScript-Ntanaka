import WebSocket, { WebSocketServer } from "ws";

// WebSocketのポート
const port = 3003;
const wss = new WebSocketServer({ port });

//ファイルを送ってきたクライアントに画像処理をして返す
wss.on("connection", (ws) => {
    ws.on("message", (message) => {
        const massageStr = message.toString();

        try {
            const message = JSON.parse(massageStr); 
            const response = {
                type: "Gauss",
                payload: {
                    // 画像処理を行ったものを送る
                    // 処理は下のgaussingImage関数で定義
                    image: gaussingImage(message.payload.image)
                }
            };
            //文字列にして送る→オブジェクトは送れない
            // 教科書より抜粋
            // 文字列やBlob、ArrayBuffer、型付き配列、DataViewオブジェクトを指定できます。
            ws.send(JSON.stringify(response));
        } catch (error) {
            // エラーが起きた際はエラーメッセージをクライアントに送信
            console.error("Error processing message:", error);
            ws.send(JSON.stringify({ 
                type: "error",
                message: error.message
            }));
        }
    });
});

// 画像データにガウスぼかしを適用する関数
function gaussingImage(imageData) {
    console.log("imageData received from client:", imageData);
    const { width, height, data } = imageData;
    const output = new Uint8ClampedArray(data.length);

    // ch104-10/ex09/index.js からそのままコピーしたガウシアンフィルタのコード
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

    // カーネル(重みづけ)の合計値を計算
    const kernelSum = kernel.reduce((sum, row) => sum + row.reduce((rowSum, value) => rowSum + value, 0), 0);

    // 前ピクセルをループして、ガウシアンフィルタを適用
    // 高さのループ
    for (let y = 0; y < height; y++) {
        // 幅のループ
        for (let x = 0; x < width; x++) {
            // 各色成分の初期化
            let r = 0, g = 0, b = 0;
            // x,yを中心にした周囲ピクセルのループ
            // 例えば(x,y)を中心にすると
            // (x-2,y+2)(x-1,y+2)(x,y+2)(x+1,y+2)(x+2,y+2)
            // (x-2,y+1)(x-1,y+1)(x,y+1)(x+1,y+1)(x+2,y+1)
            // (x-2,y  )(x-1,y  )(x,y  )(x+1,y  )(x+2,y  )
            // (x-2,y-1)(x-1,y-1)(x,y-1)(x+1,y-1)(x+2,y-1)
            // (x-2,y-2)(x-1,y-2)(x,y-2)(x+1,y-2)(x+2,y-2)
            // の25ピクセルを参照して重みづけしていく
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
            // 各色成分の平均値を計算して出力配列に格納
            const outputIndex = (y * width + x) * 4;
            // カーネルの合計値で割って正規化
            output[outputIndex] = r / kernelSum;
            // 同様に緑と青も
            output[outputIndex + 1] = g / kernelSum;
            output[outputIndex + 2] = b / kernelSum;
            output[outputIndex + 3] = data[outputIndex + 3]; // アルファ値はそのまま
        }
    }
    

    return {
        width,
        height,
        data: Array.from(output)
    };
}
