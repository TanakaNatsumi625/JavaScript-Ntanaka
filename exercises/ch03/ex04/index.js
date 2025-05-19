export function Character(){
    let hundredPoints = "💯";
    return hundredPoints.length;
} 

export function escapeCharacter(){
    return  "\uD83D\uDCAF" === "\u{0001F4AF}";
}

//動作確認
// let hundredPoints = "💯";
// console.log(hundredPoints.codePointAt(0).toString(16));
// console.log(hundredPoints.length);
// console.log("\uD83D\uDCAF")
// console.log("\u{1F600}");
//console.log("\uD83D\uDCAF" === "\u{0001F4AF}")