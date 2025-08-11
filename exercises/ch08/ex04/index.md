```js
const obj = {
  om: function () {
    const nest = {
      nm: function () {
        console.log(this === obj, this === nest);
      },
      arrow: () => {
        console.log(this === obj, this === nest);
      },
    };
    nest.nm();
    nest.arrow();
  },
};
obj.om();
```
- 予想
```js
nest.nm();
```
は、入れ子になった関数を呼び出しているので、オブジェクトobjとは等しくならない

よって、実行結果は
```
nest.nm(); →　false true`
```
となる。
```js
nest.arrow();
```
はアロー関数なので、thisが継承され、オブジェクトobjとは等しくならないと等しくなる

よって、実行結果は
```
nest.arrow(); →　true false`
```
となる。

- 結果
```
nest.nm(); →　false true`
nest.arrow(); →　true false`
```
- 補足
    - obj.om() を呼んだ時のthis は obj 。
    - om 内で this === obj は true
    - しかし、`nest.nm()`と呼んでいるので、通常関数 nm の this は 呼び出し元オブジェクト nestになる。
    - よって、`this === obj → false`, `this === nest → true`
    - `nest.arrow();`ではアロー関数なので、thisはobjになる。nestにはならない。
    