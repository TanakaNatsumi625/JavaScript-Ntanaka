// 50 x 50 の盤面とする
const ROWS = 50;
const COLS = 50;
// 1セルのサイズ
const RESOLUTION = 10;

const canvas = document.querySelector("#screen");
const ctx = canvas.getContext("2d");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");

canvas.width = ROWS * RESOLUTION;
canvas.height = COLS * RESOLUTION;

// https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame が返す ID
let animationId = null;

// NOTE: download from https://soundeffect-lab.info/sound/button/mp3/decision1.mp3
const sound = new Audio("decision1.mp3");

// ライフゲームのセル (true or false) をランダムに初期化する
//これがセルの状態
let grid = new Array(ROWS)//長さROWS=50の配列を作る
  .fill(null)//要素の中身を全てnullで初期化
  .map(() =>//それぞれの要素に対して
    new Array(COLS).fill(null).map(() => !!Math.floor(Math.random() * 2))//長さCOLS=50の配列を作り、要素をランダムにtrue or falseで初期化
  );

// grid を canvas に描画する(最終行で呼び出している)
function renderGrid(grid) {
  for (let row = 0; row < ROWS; row++) {//行ループ
    for (let col = 0; col < COLS; col++) {//それぞれの行の列でループ
      const cell = grid[row][col];//セルの状態を取得
      ctx.beginPath();//キャンパス所で新しいパスを開始
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

// Life Game のルールに従ってセルを更新する
//周囲のセルの生存数を数えて次の世代のセルの状態を決定する
//生存しているセルは、周囲に2個か3個の生存セルがあれば生き残り、
//それ以外は死ぬ。死んでいるセルは、周囲に3個の生存セルがあれば誕生する
function updateGrid(grid) {
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

// canvas がクリックされたときの処理 (セルの値を反転する)
canvas.addEventListener("click", function (evt) {//キャンバスがクリックされたときevt(イベントオブジェクト)を渡す
  const rect = canvas.getBoundingClientRect();//キャンバスの位置とサイズを取得
  //Canvas内のx = マウスx − Canvasの左位置
  //Canvas内のy = マウスy − Canvasの上位置
  const pos = { x: evt.clientX - rect.left, y: evt.clientY - rect.top };//クリック座標(ClientX/ClientY)をキャンバス上の座標に変換

  // ピクセル → マス番号に変換
  // 1マス = RESOLUTION px
  const row = Math.floor(pos.y / RESOLUTION);
  const col = Math.floor(pos.x / RESOLUTION);
  grid[row][col] = !grid[row][col];//生死反転
  sound.cloneNode().play();//クリック音を鳴らす
  renderGrid(grid);
});

// requestAnimationFrame によって一定間隔で更新・描画を行う
// NOTE: リフレッシュレートの高い画面では速く実行される (これを防ぐ場合は下記の例を参照)
// https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame

let lastTime = 0;
const interval = 200; // 更新間隔 (ミリ秒)
function update(timestamp) {
  if (timestamp - lastTime >= interval) {
    grid = updateGrid(grid);//次世代計算
    renderGrid(grid);//描画
    lastTime = timestamp;
  }
  animationId = requestAnimationFrame(update);//次のフレームでupdateを呼び出す
}

startButton.addEventListener("click", () => {
  // 既にアニメーションが動いている場合は何もしない
  if (animationId) {
    return;
  }
  update();
});

pauseButton.addEventListener("click", () => {
  // アニメーションが停止している場合は何もしない
  if (!animationId) {
    return;
  }
  cancelAnimationFrame(animationId);
  animationId = null;
});

renderGrid(grid);
