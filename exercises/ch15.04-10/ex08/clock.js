//秒針を追加する
const svg = document.querySelector("#clock");
//SVG名前空間
const SVG_NS = "http://www.w3.org/2000/svg";
//秒針の作成
//createElementNSとは、指定した名前空間に属する要素を作成するためのメソッド
const secondHand = document.createElementNS(SVG_NS, "line");
//初期値の設定(これが無いと反映されない。。。)
secondHand.setAttribute("x1", "50");
secondHand.setAttribute("y1", "50");
secondHand.setAttribute("x2", "5");
secondHand.setAttribute("y2", "50");

secondHand.classList.add("secondhand");
svg.querySelector(".hands").appendChild(secondHand);
//スタイルの追加
secondHand.innerHTML = `
<style>
.secondhand{ stroke: red; stroke-width: 1;}
</style>
`;

(function updateClock() { // SVG 時計の画像を更新して現在時刻を表示する。
let now = new Date(); // 現在時刻。
let sec = now.getSeconds(); // 秒。
let min = now.getMinutes() + sec/60; // 小数部を持つ分。
let hour = (now.getHours() % 12) + min/60; // 小数部を持つ時。
let minangle = min * 6; // 1 分あたり6 度。
let hourangle = hour * 30; // 1 時間あたり30 度。
let secangle = sec * 6; // 1 秒あたり6 度。
// 時計の針のSVG 要素を取得する。
let minhand = document.querySelector("#clock .minutehand");
let hourhand = document.querySelector("#clock .hourhand");
let sechand = document.querySelector("#clock .secondhand");
// SVG 属性を設定して、時計盤の中で回転する。
minhand.setAttribute("transform", `rotate(${minangle},50,50)`);
hourhand.setAttribute("transform", `rotate(${hourangle},50,50)`);
sechand.setAttribute("transform", `rotate(${secangle},50,50)`);
// 1 秒後にこの関数を再度実行する。
setTimeout(updateClock, 1000);
}()); // ここで関数を即座に実行していることに注意。

