//fizzbuzz:1から順に数を数え上げ、3の倍数なら「Fizz」、5の倍数なら「Buzz」、両方の倍数なら「FizzBu​​zz」と表示するプログラム 
export function fizzbuzz(){
    let str = "";for(let i = 1; i <= 100; i++){if(i % 15 === 0){str += "FizzBuzz\n"}if(i % 3 === 0 && i % 5 !== 0) {str += "Fizz\n"}if(i % 5 === 0 && i % 3 !== 0) {str += "Buzz\n"}if(i % 3 !== 0 && i % 5 !== 0) {str += `${i}\n`}}return str;
}


// export function fizzbuzz(){
//     let str = "";
//     for(let i = 1; i <= 100; i++){i%15?"":str += "FizzBuzz\n";i%5?"":str += "Buzz\n";i%3?"":str += "Fizz\n";i%3 && i%5 ? str += `${i}\n` : "";}
// console.log(str);
// return str;}   