console.log("𠮷野家"[0]); // 文字化け
console.log("👨‍👨‍👧‍👧"[0]); //文字化け
console.log("test"[0]); //t

const str = "𠮷";
//Unicodeで表したい
console.log(str);        // 𠮷
    console.log(str.length); // 2
    console.log(str[0]);     // '\uD842' → 単独では表示できないので "�"
    console.log(str[1]);     // '\uDFB7'