import { renderGrid } from "./renderGrid.js";
import { updateGrid } from "./updateGrid.js";
import { ROWS, COLS, RESOLUTION} from "./constants.js";


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
  renderGrid(grid, ctx);//グリッドを再描画
});

// requestAnimationFrame によって一定間隔で更新・描画を行う
// NOTE: リフレッシュレートの高い画面では速く実行される (これを防ぐ場合は下記の例を参照)
// https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame

let lastTime = 0;
const interval = 200; // 更新間隔 (ミリ秒)
function update(timestamp) {
  if (timestamp - lastTime >= interval) {
    grid = updateGrid(grid);//次世代計算
    renderGrid(grid, ctx);//描画
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

renderGrid(grid, ctx);
