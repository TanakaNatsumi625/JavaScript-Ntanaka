/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./ex05/constants.js"
/*!***************************!*\
  !*** ./ex05/constants.js ***!
  \***************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   COLS: () => (/* binding */ COLS),\n/* harmony export */   RESOLUTION: () => (/* binding */ RESOLUTION),\n/* harmony export */   ROWS: () => (/* binding */ ROWS)\n/* harmony export */ });\n// 50 x 50 の盤面とする\r\nconst ROWS = 50;\r\nconst COLS = 50;\r\n// 1セルのサイズ\r\nconst RESOLUTION = 10;\r\n\r\n\n\n//# sourceURL=webpack://ch17/./ex05/constants.js?\n}");

/***/ },

/***/ "./ex05/index.js"
/*!***********************!*\
  !*** ./ex05/index.js ***!
  \***********************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _renderGrid_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderGrid.js */ \"./ex05/renderGrid.js\");\n/* harmony import */ var _updateGrid_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./updateGrid.js */ \"./ex05/updateGrid.js\");\n/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants.js */ \"./ex05/constants.js\");\n\n\n\n\n\nconst canvas = document.querySelector(\"#screen\");\nconst ctx = canvas.getContext(\"2d\");\nconst startButton = document.querySelector(\"#start\");\nconst pauseButton = document.querySelector(\"#pause\");\n\ncanvas.width = _constants_js__WEBPACK_IMPORTED_MODULE_2__.ROWS * _constants_js__WEBPACK_IMPORTED_MODULE_2__.RESOLUTION;\ncanvas.height = _constants_js__WEBPACK_IMPORTED_MODULE_2__.COLS * _constants_js__WEBPACK_IMPORTED_MODULE_2__.RESOLUTION;\n\n// https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame が返す ID\nlet animationId = null;\n\n// NOTE: download from https://soundeffect-lab.info/sound/button/mp3/decision1.mp3\nconst sound = new Audio(\"decision1.mp3\");\n\n// ライフゲームのセル (true or false) をランダムに初期化する\n//これがセルの状態\nlet grid = new Array(_constants_js__WEBPACK_IMPORTED_MODULE_2__.ROWS)//長さROWS=50の配列を作る\n  .fill(null)//要素の中身を全てnullで初期化\n  .map(() =>//それぞれの要素に対して\n    new Array(_constants_js__WEBPACK_IMPORTED_MODULE_2__.COLS).fill(null).map(() => !!Math.floor(Math.random() * 2))//長さCOLS=50の配列を作り、要素をランダムにtrue or falseで初期化\n  );\n\n// canvas がクリックされたときの処理 (セルの値を反転する)\ncanvas.addEventListener(\"click\", function (evt) {//キャンバスがクリックされたときevt(イベントオブジェクト)を渡す\n  const rect = canvas.getBoundingClientRect();//キャンバスの位置とサイズを取得\n  //Canvas内のx = マウスx − Canvasの左位置\n  //Canvas内のy = マウスy − Canvasの上位置\n  const pos = { x: evt.clientX - rect.left, y: evt.clientY - rect.top };//クリック座標(ClientX/ClientY)をキャンバス上の座標に変換\n\n  // ピクセル → マス番号に変換\n  // 1マス = RESOLUTION px\n  const row = Math.floor(pos.y / _constants_js__WEBPACK_IMPORTED_MODULE_2__.RESOLUTION);\n  const col = Math.floor(pos.x / _constants_js__WEBPACK_IMPORTED_MODULE_2__.RESOLUTION);\n  grid[row][col] = !grid[row][col];//生死反転\n  sound.cloneNode().play();//クリック音を鳴らす\n  (0,_renderGrid_js__WEBPACK_IMPORTED_MODULE_0__.renderGrid)(grid, ctx);//グリッドを再描画\n});\n\n// requestAnimationFrame によって一定間隔で更新・描画を行う\n// NOTE: リフレッシュレートの高い画面では速く実行される (これを防ぐ場合は下記の例を参照)\n// https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame\n\nlet lastTime = 0;\nconst interval = 200; // 更新間隔 (ミリ秒)\nfunction update(timestamp) {\n  if (timestamp - lastTime >= interval) {\n    grid = (0,_updateGrid_js__WEBPACK_IMPORTED_MODULE_1__.updateGrid)(grid);//次世代計算\n    (0,_renderGrid_js__WEBPACK_IMPORTED_MODULE_0__.renderGrid)(grid, ctx);//描画\n    lastTime = timestamp;\n  }\n  animationId = requestAnimationFrame(update);//次のフレームでupdateを呼び出す\n}\n\nstartButton.addEventListener(\"click\", () => {\n  // 既にアニメーションが動いている場合は何もしない\n  if (animationId) {\n    return;\n  }\n  update();\n});\n\npauseButton.addEventListener(\"click\", () => {\n  // アニメーションが停止している場合は何もしない\n  if (!animationId) {\n    return;\n  }\n  cancelAnimationFrame(animationId);\n  animationId = null;\n});\n\n(0,_renderGrid_js__WEBPACK_IMPORTED_MODULE_0__.renderGrid)(grid, ctx);\n\n\n//# sourceURL=webpack://ch17/./ex05/index.js?\n}");

/***/ },

/***/ "./ex05/renderGrid.js"
/*!****************************!*\
  !*** ./ex05/renderGrid.js ***!
  \****************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderGrid: () => (/* binding */ renderGrid)\n/* harmony export */ });\n/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ \"./ex05/constants.js\");\n\r\n\r\n// grid を canvas に描画する(最終行で呼び出している)\r\nfunction renderGrid(grid, ctx) {\r\n  for (let row = 0; row < _constants_js__WEBPACK_IMPORTED_MODULE_0__.ROWS; row++) {//行ループ\r\n    for (let col = 0; col < _constants_js__WEBPACK_IMPORTED_MODULE_0__.COLS; col++) {//それぞれの行の列でループ\r\n      const cell = grid[row][col];//セルの状態を取得\r\n      ctx.beginPath();//キャンバス上で新しいパスを開始\r\n      // 四角形を描く\r\n      //rect(x, y, width, height)\r\n      //x=列番号*セルサイズ, y=行番号*セルサイズ⇒セルの位置\r\n      //width=height=セルサイズ⇒セルの大きさ\r\n      ctx.rect(col * _constants_js__WEBPACK_IMPORTED_MODULE_0__.RESOLUTION, row * _constants_js__WEBPACK_IMPORTED_MODULE_0__.RESOLUTION, _constants_js__WEBPACK_IMPORTED_MODULE_0__.RESOLUTION, _constants_js__WEBPACK_IMPORTED_MODULE_0__.RESOLUTION);//セルの上に四角形を重ねて書く\r\n      ctx.fillStyle = cell ? \"gray\" : \"white\";//1セルの色を設定。黒は怖いので灰色にした\r\n      ctx.fill();\r\n      ctx.stroke();\r\n    }\r\n  }\r\n}\n\n//# sourceURL=webpack://ch17/./ex05/renderGrid.js?\n}");

/***/ },

/***/ "./ex05/updateGrid.js"
/*!****************************!*\
  !*** ./ex05/updateGrid.js ***!
  \****************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   updateGrid: () => (/* binding */ updateGrid)\n/* harmony export */ });\n/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ \"./ex05/constants.js\");\n\r\n// Life Game のルールに従ってセルを更新する\r\n//周囲のセルの生存数を数えて次の世代のセルの状態を決定する\r\n//生存しているセルは、周囲に2個か3個の生存セルがあれば生き残り、\r\n//それ以外は死ぬ。死んでいるセルは、周囲に3個の生存セルがあれば誕生する\r\nfunction updateGrid(grid) {\r\n  // 新しいグリッドを作成\r\n  const nextGrid = grid.map((arr) => [...arr]);\r\n\r\n  for (let row = 0; row < _constants_js__WEBPACK_IMPORTED_MODULE_0__.ROWS; row++) {\r\n    for (let col = 0; col < _constants_js__WEBPACK_IMPORTED_MODULE_0__.COLS; col++) {\r\n      // 周囲のセルの生存数を数えて nextGrid[row][col] に true or false を設定する (実装してね)\r\n      //周囲の生きているセルを数えるための定数\r\n      let liveNeighbors = 0;\r\n      //注目しているセルが(row, col)のときに、その周囲のセルは(row-1, col-1)から(row+1, col+1)までの範囲にある\r\n      //よって、-1,0,-1の組み合わせが大事\r\n\r\n      for (let y = -1; y <= 1; y++) {\r\n        for (let x = -1; x <= 1; x++) {\r\n          if (y === 0 && x === 0) continue; // 自分自身はカウントしない\r\n          const newRow = row + y;\r\n          const newCol = col + x;\r\n          // グリッドの範囲内かどうかをチェック\r\n          if (newRow >= 0 && newRow < _constants_js__WEBPACK_IMPORTED_MODULE_0__.ROWS && newCol >= 0 && newCol < _constants_js__WEBPACK_IMPORTED_MODULE_0__.COLS) {\r\n            // 周囲の生きているセルを数えていく\r\n            if (grid[newRow][newCol]) {\r\n              liveNeighbors++;\r\n            }\r\n          }\r\n        }\r\n      }\r\n      //自分が生きているセルの場合\r\n      if (grid[row][col]) {\r\n        if (liveNeighbors < 2 || liveNeighbors > 3) {\r\n          nextGrid[row][col] = false; // 過疎または過密で死ぬ\r\n        }\r\n      } else {\r\n        // 死んでいるセルの場合\r\n        if (liveNeighbors === 3) {\r\n          nextGrid[row][col] = true; // 誕生\r\n        }\r\n      }\r\n    }\r\n  }\r\n  return nextGrid;\r\n}\n\n//# sourceURL=webpack://ch17/./ex05/updateGrid.js?\n}");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./ex05/index.js");
/******/ 	
/******/ })()
;