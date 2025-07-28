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

| 状態           | 動作                   | かかる時間                      |
| ------------ | ------------------------ | -------------------------- |
| 空きがあるとき| 値を末尾に書く | 1 ステップ（定数）             |
| 満杯になった瞬間 | 新しい配列（2 倍）を作って全部コピー + 追加 | n+1 ステップ（コピー n + 書き込み） |

- ⇒以上を計算すると平均計算量：$O(1)$(定数時間)

## 関数 `copyA`の時間計算量
```js
function copyA(array) {
  const result = Array(array.length);
  for (let i = 0; i < array.length; i++) {
    result[i] = array[i];
  }
  return result;
}
```
## 関数 `copyB`の時間計算量
```js
// NOTE: copyB よりも copyA の方が効率的に見えるが計算量の観点ではどうだろうか
function copyB(array) {
  const result = [];
  for (const v of array) {
    result.push(v);
  }
  return result;
}
```