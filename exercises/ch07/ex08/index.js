export function reverse(str) {
  //Intl.Segmenter()：文字列をグラフェム単位で分割するためのAPI
  //"ja"：日本語として使うという意味
  //{ granularity: "grapheme" }：グラフェム単位で分割するオプション。{ granularity: "word" }とかもある
  const segmenter = new Intl.Segmenter("ja", { granularity: "grapheme" });
  //segmenter.segment(str)は、文字列をグラフェム単位で分割したイテレータを返す
  console.log(Array.from(segmenter.segment(str))); // イテレータの内容を確認するためのデバッグ出力
  //Array.from()を使って、イテレータから配列に変換する
  const segments = Array.from(segmenter.segment(str), s => s.segment);
  //reverse()を使って、配列を逆順にし、join("")で文字列に結合する
  return segments.reverse().join("");
}

// 動作確認
console.log(reverse("家族 👨‍👨‍👧‍👧"));  // 👨‍👨‍👧‍👧 族家

//細かいメモは知見として課題10に記載
