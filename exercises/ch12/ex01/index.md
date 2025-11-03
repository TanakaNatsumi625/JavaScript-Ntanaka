## counterIter()
- 共通出力
    - `let iter1 = counterIter(3);`で呼ばれた瞬間`console.log("counterIter");`が出力される

|操作|出力|説明|
|----|----|----|
|next()|counterIter<br>counterIter: next<br>{ value: 1, done: false }<br>counterIter: next<br>{ value: 2, done: false }|next()に定義されている値で出力される|
|return()|counterIter<br>counterIter: return: end<br>{ value: 'end', done: true }|まずconterIter()の上から処理が始まる(`counterIter`)<br>→return()内の処理が始まる|
|throw()|counterIter<br>counterIter: throw: Error: Iter error|throw()内の処理が実行される|
|for-of|counterIter<br>counterIter: Symbol.iterator<br>counterIter: next<br>value: 1<br>counterIter: next<br>value: 2<br>counterIter: next<br>value: 3<br>counterIter: next|next()の出力がmax分だけ出力され、doneがtrueになるまで反復される|
|for-of break()|counterIter<br>counterIter: Symbol.iterator<br>counterIter: next<br>value: 1<br>counterIter: return: undefined|for...of ループが始まると、まず Symbol.iterator メソッドが呼ばれる<br>→ループ一回目でnext()が呼ばれるので`counterIter: next`が出力される<br>→value: 1が出力される<br>breakによりreturn()が呼ばれ`counterIter: return: undefined`が出力される|
|for-of中に例外|counterIter<br>counterIter: Symbol.iterator<br>counterIter: next<br>value: 1<br>counterIter: next<br>value: 2<br>counterIter: return: undefined|2回目のループまでは`for-of`と同様<bt>→ループ内で例外`throw new Error("Iter break")`が出ると.return()を呼ぶ<br>`counterIter: return: undefined`が出力され終了|

## counterGen()
- 共通出力
    - `let gen1 = counterGen(3);`で呼ばれた瞬間`console.log("counterGen");`が出力される
- try-catch-finallyを実行するため、return()以降はnext()を読んでから実行
- .return()は構文として呼ぶことができるが、内部で気にはfinallyが働く

|操作|出力|説明|
|----|----|----|
|next()|counterGen<br>counterGen: next<br>{ value: 1, done: false }<br>counterGen: next<br>{ value: 2, done: false }|呼ぶたびにyieldで出力される|
|return()|counterGen: finally<br>{ value: 'end', done: true }|finally内の処理が実行される|
|throw()|counterGen<br>counterGen: next<br>counterGen: catch: Error: Gen error<br>counterGen: finally|catch()内の処理が実行され、最後finally内の処理が実行される|
|for-of|counterGen<br>counterGen: next<br>value: 1 next: { value: undefined, done: true }<br>counterGen: next<br>value: 2 next: { value: undefined, done: true }<br>counterGen: next<br>value: 3 next: { value: undefined, done: true }<br>counterGen: finally|vの中にnext()の内容も含まれる。doneは常にtrue。try内でmaxの文だけ繰り返しvが出力され、処理が終了したらfinallyの処理が実行される|
|for-of break()|counterGen<br>counterGen: next<br>value: 1<br>counterGen: finally|for...of が始まるとnext()が呼ばれる<br>→一回目のyieldが呼ばれるので`counterGen: next`と`value: 1`が出力される<br>→breakより中断されるとfinallyが呼び出され`counterGen: finally`が出力される|
|for-of中に例外|counterGen<br>counterGen: next<br>value: 1<br>counterGen: next<br>value: 2<br>counterGen: finally|2回目のループまでは`for-of`と同様<bt>→ループ内で例外`throw new Error("Gen break")`が出るとfinallyが呼び出され`counterGen: finally`が出力される|