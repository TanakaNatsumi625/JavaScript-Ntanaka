export function ifConvertEscapedChars(str) {
    let escapedStr = ""
    //for/of文は文字列の各文字を順に処理される
    for (let letter of str){

        if (letter === "\b") {
            escapedStr += "\\b";
        }
        else if (letter === "\t") {
            escapedStr += "\\t";
        }
        else if (letter === "\n") {
            escapedStr += "\\n";
        }
        else if (letter === "\v") {
            escapedStr += "\\v";
        }
        else if (letter === "\f") {
            escapedStr += "\\f";
        }
        else if (letter === "\r") {
            escapedStr += "\\r";
        }
        else if (letter === "\'") {
            escapedStr += "\\'";
        }
        else if (letter === '\"') {
            escapedStr += '\\"';
        }
        else if (letter === "\\") {
            escapedStr += "\\\\";
        } else {
            escapedStr += letter;
        }
    }
    return escapedStr;
}

// console.log(ifConvertEscapedChars("Hello\nWorld\t\\Test")); 
// console.log(ifConvertEscapedChars("My\vName\fIs\rRicoh"));
// console.log(ifConvertEscapedChars("Alice\tin\nwonderland"));

console.log(JSON.stringify(ifConvertEscapedChars("Hello\nWorld\t\\Test")));
console.log(JSON.stringify(ifConvertEscapedChars("Name\tAge\tCity")));
console.log(JSON.stringify(ifConvertEscapedChars("Alice\t30\tTokyo")));
