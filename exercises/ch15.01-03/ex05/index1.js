/* eslint-disable no-undef */

//  215ms→125ms
document.addEventListener("DOMContentLoaded", () => {
    $("div#1000").html(_.capitalize("hello"));
});
// window.addEventListener("load", () => {
//     $("div#1000").html(_.capitalize("hello"));
// });