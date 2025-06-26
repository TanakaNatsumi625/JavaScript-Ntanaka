export function switchConvertEscapedChars(str) {
    let escapedStr = ""
    for (let letter of str){
        switch (letter) {
            case "\b":
                escapedStr += "\\b";
                break;
            case "\t":
                escapedStr += "\\t";
                break;
            case "\n":
                escapedStr += "\\n";
                break;
            case "\v":
                escapedStr += "\\v";
                break;
            case "\f":
                escapedStr += "\\f";
                break;
            case "\r":
                escapedStr += "\\r";
                break;
            case "\'":
                escapedStr += "\\'";
                break;
            case '\"':
                escapedStr += '\\"';
                break;
            case "\\":
                escapedStr += "\\\\";
                break;
            default:
                escapedStr += letter;
                break;
                
           
        }
    }
    return escapedStr;
}

console.log(JSON.stringify(switchConvertEscapedChars("Hello\nWorld\t\\Test")));
console.log(JSON.stringify(switchConvertEscapedChars("Name\tAge\tCity")));
console.log(JSON.stringify(switchConvertEscapedChars("Alice\t30\tTokyo")));