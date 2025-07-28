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

| 状態           | 処理内容                 | かかる時間                      |
| ------------ | ------------------------ | -------------------------- |
| 空きがあるとき| 値を末尾に書く | 1 ステップ（定数）             |
| 満杯になった瞬間 | 新しい配列（2 倍）を作って全部コピー + 追加 | n+1 ステップ（コピー n + 書き込み） |

- ⇒以上を計算すると平均計算量：$O(1)$(定数時間)

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
| 処理内容           | 時間                        |
| --------------- | ------------------------- |
| 新しい長さ n の配列を作る  | O(n)（初期化せず確保だけで長さ n に比例） |
| for ループで n 回コピー | O(n)（1 要素あたり O(1)）        |
| 結果を返すだけ         | O(1)                      |

よって合計を足すと時間計算量は$O(n)$になる⇒**要素数nに比例する回数の処理**
```
O(n) + O(n) + O(1) = O(n)
```
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
| 処理内容           | 時間                        |
| --------------- | ------------------------- |
| 空配列を用意  | O(1)） |
| for ループで n 回コピー | O(n)（1 要素あたり O(1)）        |
| 結果を返すだけ         | O(1)                      |

よって合計を足すと時間計算量は$O(n)$になる
```
O(1) + O(n) + O(1) = O(n)
```

### まとめ
copyBの方がすっきりしていて効率よさそうだったが、時間計算量は同じである