export function slice(str, indexStart, indexEnd) {
  // TODO: ここを実装しなさい
  //参考：https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/slice

  let result = "";

  if (indexStart < 0) {
    indexStart = Math.max(0, str.length + indexStart);
  }

  if (indexStart === undefined || isNaN(indexStart)) {
    indexStart = 0;
  }else{
    indexStart = Math.trunc(indexStart);
  }

  if ( indexEnd === undefined || indexEnd > str.length) {
    indexEnd = str.length; 
  }else if (isNaN(indexEnd)) {
    indexEnd = "";
  }
  else{
    indexEnd = Math.trunc(indexEnd);
  }
  if (indexEnd < 0) {
    indexEnd = Math.max(0, str.length + indexEnd);
  }

  if(indexStart >= indexEnd){
    return "";
  }

  for (let i = indexStart; i < indexEnd; i++) {
    if (i >= 0 && i < str.length) {
      result += str[i];
    }
  }
  console.log(result);
  return result;
}

// const str = "Hello World!";

// slice(str);
// slice(str, 2);
// slice(str, -3);
// slice(str, 100);
// slice (str, -100);
// slice(str, 0, str.length);
// slice(str, str.length, 0);
// slice(str, 2, 7);
// slice(str, 7, 2);
// slice(str, 3, 3);
// slice(str, 2, 100);
// slice(str, 100, 2);
// slice(str, 2, -3);
// slice(str, -3, 2);
// slice(str, 2, NaN);
// slice(str, NaN, 2);
// slice(str, 2.3, 6.7);
// slice(str, 2, Infinity);