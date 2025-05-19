export function convertLf (stringLf) {
    const convertedString = stringLf.replace(/\n/g, "\r\n");//gは文字列内の全てという意味。
    return convertedString;
}
export function convertCrLf (stringCrLf) {
    return stringCrLf.replace(/\r\n/g, "\n");
}

// 動作確認
// convertLf("Hello\nworld\nHello\nworld");
// convertCrLf("Hello\r\nworld\r\nHello\r\nworld");

//memo
//replaceメソッドはreplace(pattern, replacement)で表される
//patternは正規表現または文字列で、replacementは置き換え後の文字列
//文字列パターンは一度だけ置換される。
//だから、gフラグを使うことで、文字列内の全ての一致を置換することができる。
//もしくは、replaceAllメソッド
//string.replace("\n", "\r\n")とすると、\nが文字列として認識されるため、最初の\nだけが置換される。
//参考：https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/replace