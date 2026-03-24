import { ROWS, COLS } from "./constants.js";
// Life Game のルールに従ってセルを更新する
//周囲のセルの生存数を数えて次の世代のセルの状態を決定する
//生存しているセルは、周囲に2個か3個の生存セルがあれば生き残り、
//それ以外は死ぬ。死んでいるセルは、周囲に3個の生存セルがあれば誕生する
export function updateGrid(grid) {
  // 新しいグリッドを作成
  const nextGrid = grid.map((arr) => [...arr]);

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      // 周囲のセルの生存数を数えて nextGrid[row][col] に true or false を設定する (実装してね)
      //周囲の生きているセルを数えるための定数
      let liveNeighbors = 0;
      //注目しているセルが(row, col)のときに、その周囲のセルは(row-1, col-1)から(row+1, col+1)までの範囲にある
      //よって、-1,0,-1の組み合わせが大事

      for (let y = -1; y <= 1; y++) {
        for (let x = -1; x <= 1; x++) {
          if (y === 0 && x === 0) continue; // 自分自身はカウントしない
          const newRow = row + y;
          const newCol = col + x;
          // グリッドの範囲内かどうかをチェック
          if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS) {
            // 周囲の生きているセルを数えていく
            if (grid[newRow][newCol]) {
              liveNeighbors++;
            }
          }
        }
      }
      //自分が生きているセルの場合
      if (grid[row][col]) {
        if (liveNeighbors < 2 || liveNeighbors > 3) {
          nextGrid[row][col] = false; // 過疎または過密で死ぬ
        }
      } else {
        // 死んでいるセルの場合
        if (liveNeighbors === 3) {
          nextGrid[row][col] = true; // 誕生
        }
      }
    }
  }
  return nextGrid;
}