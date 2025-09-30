export function retryWithExponentialBackoff(func, maxRetry, callback) {
    let attemptCount = 0;

    function attempt() {
        const result = func();
        if (result) {
            //成功した場合はcallbackを呼び出して終了
            callback(true);
            return;
        }

        attemptCount++;

        if (attemptCount > maxRetry) {
            //最大試行回数を超えた場合はエラーを返して終了
            callback(false);
            return;
        }

        let waitTime = Math.pow(2, attemptCount - 1) * 1000; //指数関数的に増加（ミリ秒単位）

        //一定時間（＝waitTime）待機してから再試行
        setTimeout(() => {
            attempt();
        }, waitTime);
    }

    //最初の試行を非同期で開始
    setTimeout(() => {
        attempt();
    }, 0);
}

let count = 0;

//呼び出されるたびにcountをインクリメントし、3回目でtrueを返す関数
retryWithExponentialBackoff(() => {
    console.log(`count: ${count}`);
    count++;
    return count === 4;
}, 2, (success) => {
    if (success) {
        console.log("Operation succeeded");
    } else {
        console.log("Operation failed");
    }
});
