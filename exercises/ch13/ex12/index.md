### 予想
- AとBが交互に出る
### 結果：
- 大量にAとBが交互に出る
### 理由：
- setTimeout()がマイクロタスクキューに登録される
- longA() と longB() が呼ばれる
    - await Promise.resolve({})はすぐ解決済みのPromiseを返す
    - awaitはマイクロタスク次のマイクロタスクで再開するので、awaitのたびにマイクロタスクに戻る
    - よってlogAとLogBが交互に進むループに陥る
- setTimeout()はawaitのマイクロタスクがすべて片付いた後なので、`Hello, world！`は永遠に出力されない