## jQuery Deferredとは
- 参考：https://techblog.yahoo.co.jp/programming/jquery-deferred/ (これわかりやすかった)
- 参考：https://qiita.com/opengl-8080/items/6eba7922be168edfc439

- 非同期の処理それぞれに Promise と呼ばれるオブジェクトを割り当て、そのオブジェクトの状態を伝播させていくことで処理を進める
    - つまり、非同期処理の成功/失敗を通知したり、それぞれのコールバックを登録し、非同期処理が完了したときに実行できる
- 使い方
    - $.Deferred()でDeferredオブジェクトを作る
    - 非同期処理が終わったら作ったDeferredオブジェクトの状態を変更するように設定しつつ、処理を開始
    - 非同期処理が終わったら、Deferredオブジェクトが持つPromiseオブジェクトをreturnする

## Promiseとの関係
- DeferredはJ.Query Deferredが作るオブジェクトで、DeferredはPromiseを内包している
- Deferred内のPromiseの状態を変化させながら.then()などでPromiseの結果を伝播させていく
- DeferredはほぼPromiseのようにふるまうことができる

### Deferred(Promise)の構造
- Promiseオブジェクトは以下三つの概念を持つ
    - 状態(.state)→pending, resolve, reject
    - 状態がresolveになった時に実行されるコールバック(.done())
    - 状態がRejectになった時に実行されるコールバック(.fail())
- Promiseオブジェクトの状態遷移とコールバック
    - Promiseオブジェクトは作られたときはpeding状態
    - 非同期関数が処理を終えると、成功失敗に応じてPromiseオブジェクトの状態がresolve、Rejectに変わり、それぞれに対応するコールバックが呼ばれる
    - then()を使うとresolveコールバックとRejectコールバック両方登録できる
    ```
    delayHello()
    .then(function(){ /* resolvedで実行 */ }, function(e){ /* rejectedで実行 */ });
    ```
    - then()/catch()と同等の処理になる
