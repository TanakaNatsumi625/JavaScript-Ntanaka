export function template(strings, ...values){
    //``の場合空文字を返す
    if(strings.length ===1 && strings[0] ===""){
        //JSON.stringify()出ないとコンソールには出ない
        return JSON.stringify("");
    }
    //values(${})で埋め込まれた値の型を列挙して文字列を作成
    let type = values.map( v => String(typeof v))

    //stringsとtypeを交互に結合して最終的な文字列を作成
    let result = strings[0];
    for(let i=0; i < type.length; i++){
        result += type[i] + strings[i+1];
    }

    //空文字の場合は""を返す
    return result;

}

console.log(template``);
console.log(template`test`);
console.log(template`Hello, ${"A"}`);
console.log(template`${1} ${null} ${() => {}}`);
console.log(template`type of 'A' is ${"A"}`);