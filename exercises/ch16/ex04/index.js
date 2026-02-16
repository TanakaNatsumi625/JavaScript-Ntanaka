import fs from "fs/promises";
import iconv from "iconv-lite";

// まずは日本語で書かれたものが文字化けするのを確認する
const fileText = await fs.readFile("hello.txt", "utf8");
console.log(fileText);//����ɂ��́Iが返ってきた(こんにちはが文字化け)

// 文字化けを確認したところで、文字化けを解消できる実装をする
// 参考：https://photo-tea.com/p/nodejs-shift-jis-read/
const fileBuffer = await fs.readFile("hello.txt");
const decodedText = iconv.decode(fileBuffer, "Shift_JIS");
console.log(decodedText);//こんにちは！