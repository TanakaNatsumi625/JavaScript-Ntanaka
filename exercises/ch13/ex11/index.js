export function retryWithExponentialBackoff(func, maxRetry) {
  let attemptCount = 0;

  function attempt() {
    return func()
      .then((result) => {
        //成功した場合resolve
        //fetchは通信さえできれば成功とみなす＝HTTPエラー(400、500)でもresolveされる
        return result;
      })
      .catch(err => {
        attemptCount++;
        if (attemptCount > maxRetry) {
          //最大試行回数を超えた場合reject
          console.log("Max retry attempts reached");
          return Promise.reject(err);
        }


        const waitTime = Math.pow(2, attemptCount - 1) * 100; //指数関数的バックオフの待機時間（ミリ秒）
        return new Promise(resolve => setTimeout(resolve, waitTime))
          .then(() => attempt());
      });
  }
  return attempt();
}

// let count = 0;

// const resp = await retryWithExponentialBackoff(
//   () => {
//     console.log(`count: ${count}`);
//     count++;
//     return fetch("https://example.com");
//   },
//   5
// );
// console.log(`Response status: ${resp.status}`);