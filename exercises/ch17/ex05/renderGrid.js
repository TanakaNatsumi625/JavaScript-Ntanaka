import { ROWS, COLS, RESOLUTION } from "./constants.js";

// grid を canvas に描画する(最終行で呼び出している)
export function renderGrid(grid, ctx) {
  for (let row = 0; row < ROWS; row++) {//行ループ
    for (let col = 0; col < COLS; col++) {//それぞれの行の列でループ
      const cell = grid[row][col];//セルの状態を取得
      ctx.beginPath();//キャンバス上で新しいパスを開始
      // 四角形を描く
      //rect(x, y, width, height)
      //x=列番号*セルサイズ, y=行番号*セルサイズ⇒セルの位置
      //width=height=セルサイズ⇒セルの大きさ
      ctx.rect(col * RESOLUTION, row * RESOLUTION, RESOLUTION, RESOLUTION);//セルの上に四角形を重ねて書く
      ctx.fillStyle = cell ? "gray" : "white";//1セルの色を設定。黒は怖いので灰色にした
      ctx.fill();
      ctx.stroke();
    }
  }
}