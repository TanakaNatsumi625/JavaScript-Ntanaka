## try-catch-finally の実行順序が確認できるコードを書きなさい。
``` js
function executeWithTryCatchFinally() {
    try {
        console.log("try ");
        throw new Error("An error occurred in the try");
    } catch (error) {
        console.log("catch");
        console.error(error.message);
    } finally {
        console.log("finally");
    }
    }
```
実行したところ、以下のように出力された
```
try 
catch
An error occurred in the try
finally

```
以上から、catchでエラーがスローされてからtryのエラー文が実行されることが分かった
メモ：
try→tryでエラーがスローされる→catchが実行される→try完了→finally