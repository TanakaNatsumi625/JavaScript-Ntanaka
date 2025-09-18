notExport.js
```js
console.log('モジュール1が読み込まれました')
```

notExport2.js
```js
console.log('モジュール2が読み込まれました')
```

import.js
```js
console.log("import.jsが開始されました");

import "./notExport.js";
import "./notExport2.js";
import "./notExport.js"; //2回目

console.log("import.jsが終了しました");
```

予想：
```js
import.jsが開始されました
モジュール1が読み込まれました
モジュール2が読み込まれました
import.jsが終了しました
//notExport.jsは二回目読み込んでも実行されない
```

結果：
```js
モジュール1が読み込まれました
モジュール2が読み込まれました
import.jsが開始されました
import.jsが終了しました
```
- import文は巻き上げられるので先に読み込まれる