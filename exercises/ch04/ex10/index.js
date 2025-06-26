let array = ["r", "i", "c", "o", "h"];
delete array[3]; //要素3が空要素になる
console.log(array); //[ 'r', 'i', 'c', <1 empty item>, 'h' ]
console.log(array.length); // 5。配列の長さは変わらない