// JavaScript の配列は動的配列である。一般的に動的配列は固定長の配列を用いて実装される。実際に作成してみよう。

// 以下の `makeFixedSizeArray` は固定長の配列を返す関数だと考えなさい。この関数を用いて動的配列 `DynamicSizeArray` を作成しなさい。
export function makeFixedSizeArray(size) {
  const array = new Array(size);
  return {
    get(index) {
      if (index < 0 || array.length <= index) {
        throw new Error(`Array index out of range: ${index}`);
      }
      return array[index];
    },
    set(index, value) {
      if (index < 0 || array.length <= index) {
        throw new Error(`Array index out of range: ${index}`);
      }
      array[index] = value;
    },
    length() {
      return array.length;
    },
  };
}

export class DynamicSizeArray {
  static INITIAL_SIZE = 4; // 初期サイズ

  constructor() {
    this.len = 0;
    this.array = makeFixedSizeArray(DynamicSizeArray.INITIAL_SIZE);
  }
  get(index) {
    /* TODO */
    if (index < 0 || this.len <= index) {
      throw new Error(`Array index out of range: ${index}`);
    }
    return this.array.get(index);
  }
  set(index, value) {
    /* TODO */
    if (index < 0 || this.len <= index) {
      throw new Error(`Array index out of range: ${index}`);
    }
    this.array.set(index, value);
  }
  length() {
    /* TODO */
    return this.len;
  }
  push(value) {
    /* TODO */
    if (this.len >= this.array.length()) {
      // 配列のサイズを超えた場合、拡張する(倍サイズにする)
      const newArray = makeFixedSizeArray(this.array.length() * 2);
      for (let i = 0; i < this.len; i++) {
        newArray.set(i, this.array.get(i));
      }
      this.array = newArray;
    }
    this.array.set(this.len, value);
    this.len++;
  }
}

//動作確認
const dsa = new DynamicSizeArray();

dsa.push(10);// 初期サイズは4なので、ここではまだ拡張されない
dsa.push(20);
dsa.push(30);
dsa.push(40);
dsa.push(50); // ← ここで拡張される

console.log(dsa.length()); // 5
console.log(dsa.get(0));   // 10
console.log(dsa.get(4));   // 50

dsa.set(2, 99);
console.log(dsa.get(2));   // 99

// dsa.set(5, 100); → エラー：Index out of range
