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
// NOTE: download from https://soundeffect-lab.info/sound/button/mp3/decision1.mp3
const sound = new Audio("decision1.mp3");

// ライフゲームのセル (true or false) をランダムに初期化する
//これがセルの状態
let grid = Array.from({ length: ROWS }, () =>
  Array(COLS).fill(false)
);

// WebOSocketでサーバー疎接続する
const ws = new WebSocket("ws://localhost:3003");

ws.addEventListener("open", () => {
  console.log("websocket status:", ws.readyState);
});

// サーバーからのメッセージを受信
ws.addEventListener("message", (event) => {
  const data = JSON.parse(event.data);
  console.log("Received data:", data);
  if (data.type === "update") {
    grid = data.grid;
    renderGrid(grid);
  }
});

// grid を canvas に描画する(最終行で呼び出している)
function renderGrid(grid) {
  console.log("Rendering grid...");
  ctx.clearRect(0, 0, canvas.width, canvas.height);//キャンバス全体をクリア
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

// canvas がクリックされたときの処理 (セルの値を反転する)
// 今回はクリックしたら送信だけ
canvas.addEventListener("click", function (evt) {//キャンバスがクリックされたときevt(イベントオブジェクト)を渡す
  // まずは場所確認
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
  // いよいよ送信
  ws.send(JSON.stringify({//サーバーにクリック情報を送信
    type: "toggle",
    row: row,
    col: col
  }));
});

startButton.addEventListener("click", () => {
  ws.send(JSON.stringify({//サーバーにクリック情報を送信
    type: "start"
  }));
});

pauseButton.addEventListener("click", () => {
  ws.send(JSON.stringify({//サーバーにクリック情報を送信
    type: "pause"
  }));
});
