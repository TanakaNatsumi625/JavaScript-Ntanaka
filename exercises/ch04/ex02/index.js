// for (i = 1; i < 101; i++)
//     console.log(i % 15 ? (i % 3 ? (i % 5 ? i : "Buzz") : "Fizz") : "FizzBuzz");

for ( let i = 1; i < 101; i++){
    if(i % 15){
        console.log("FizzBuzz");
    }
    if(i % 3){
        console.log("Fizz");
    }else{
        console.log("Buzz");
    }
}
    