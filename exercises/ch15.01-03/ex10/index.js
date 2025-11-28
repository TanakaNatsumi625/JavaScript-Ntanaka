// div 要素をクリックすると input 要素が focus される
const div = document.getElementById("editor-front");
div.style.backgroundColor = "white";
const input = document.getElementById("editor-back");

div.addEventListener("click", () => {
    // input 要素にフォーカスを移動する
    input.focus();
});

// input 要素が focus されたら div 要素の背景色を銀色に、blur されたら白色に変更する
input.addEventListener("focus", () => {
    // div 要素の背景色を銀色に変更する
    div.style.backgroundColor = "silver";
});

input.addEventListener("blur", () => {
    // div 要素の背景色を白色に戻す
    div.style.backgroundColor = "white";
});

// input 要素に入力された内容を div 要素に表示する
input.addEventListener("input", () => {
    // XSS 対策として、テキストとして表示するために textContent を使用する
    div.textContent = input.value;
});