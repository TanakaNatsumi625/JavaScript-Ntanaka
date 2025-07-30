## 7.10 で作成した動的配列の push の平均時間計算量を説明
```js
push(value) {
      /* TODO */
        if (this.len >= this.array.length()) {
            const newArray = makeFixedSizeArray(this.array.length() * 2);
            for (let i = 0; i < this.len; i++) {
                newArray.set(i, this.array.get(i));
            }
            this.array = newArray;
        }
        this.array.set(this.len, value);
        this.len++;
    }
```
- pushの動作にかかる時間
- pushの再配置にはn回呼ぶとき倍々に拡張される
- よって、再配置の回数は$\log_2 n$ 回
- 再配置のたびにそれまで入っていたすべての要素を新しい配列にコピーする⇒1 + 2 + 4 +...= n-1
- pushの回数nに対してコピーコストがn-1なので、$\frac{n - 1}{n} ≒ 1$
- ⇒平均計算量：$O(1)$(定数時間)

## 関数 `copyA`の時間計算量
```js
function copyA(array) {
  const result = Array(array.length);//配列の確保
  for (let i = 0; i < array.length; i++) {//n回ループ
    result[i] = array[i];//各要素をresultにコピー
  }
  return result;
}
```
```Array(array.length);```は長さだけ指定なので定数時間
- ループはn回
- よって$O(n)$⇒**要素数nに比例する回数の処理**

## 関数 `copyB`の時間計算量
```js
// NOTE: copyB よりも copyA の方が効率的に見えるが計算量の観点ではどうだろうか
function copyB(array) {
  const result = [];//空配列を用意
  for (const v of array) {//n回ループ
    result.push(v);//vをプッシュする
  }
  return result;//結果返す
}
```
- ループはn回なので、$O(n)$
- pushは上記より$O(1)$
- よって、$O(n)$

### まとめ
copyBの方がすっきりしていて効率よさそうだったが、時間計算量は同じである