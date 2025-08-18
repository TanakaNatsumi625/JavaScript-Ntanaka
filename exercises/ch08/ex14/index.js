export function any (...f){
    return function(arg){
        //いずれかの関数が true を返せば true を返す
        for (const fn of f) {
            if (fn(arg)) {
                //もしfn(arg)がtrueを返した場合
                return true;
            }
        }
        //どの関数も true を返さなかった場合
        return false;
    }
}

const isNonZero = any(
    (n) => n > 0,
    (n) => n < 0
  );
  
  console.log(isNonZero(0)); 
  console.log(isNonZero(42)); 
  console.log(isNonZero(-0.5)); 

//二つの関数を引数に渡すことで、一つの関数の中でパターンに合わせた関数を呼び出す
export function catching(f, g){
    return function(args){
        try {
            //fを実行して結果を返す
            return f(args);
        } catch (e) {
            //エラーが発生した場合はgにエラーを渡して結果を返す
            return g(e);
        }
    }
}

const safeJsonParse = catching(JSON.parse, (e) => {
    return { error: e.toString() };
  });
  
  console.log(safeJsonParse('{"a": 1}')); // => {a: 1}
  console.log(safeJsonParse("{Invalid Json}")); // => {error: "SyntaxError: ..."}