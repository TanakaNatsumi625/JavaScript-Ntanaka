// 最も早いのが以下
document.getElementById("1000").innerHTML = "Hello";

// 133ms→231ms
// document.addEventListener("DOMContentLoaded", () => {
//     document.getElementById("1000").innerHTML = "Hello";
// });

// 133ms→286ms
// window.addEventListener("load", () => {
//   document.getElementById("1000").innerHTML = "Hello";
// });
