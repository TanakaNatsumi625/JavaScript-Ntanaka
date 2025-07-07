export function newHashTable(capacity) {
  return {
    size: 0, // マッピング数を示すプロパティ
    entries: new Array(capacity), // マッピングを格納する固定長の配列
    get(key) {
      // keyにマップされた値を取得する
      const index = this.hash(key); // keyをハッシュ値に変換してインデックスを取得
      let entry = this.entries[index]; // entries配列の指定インデックスにアクセス
      while (entry) {
        // もしそのインデックスにマッピングが存在する場合は、リンクリスト(next)を辿ってkeyを探す
        if (entry.key === key) {
          return entry.value; // keyが見つかったらvalueを返す
        }
        entry = entry.next; // 次のエントリに移動
      }
      return undefined; // keyが見つからなかった場合はundefinedを返す
    },
    put(key, value) {
      // key, valueのマッピングを追加する
      const index = this.hash(key); // keyをハッシュ値に変換してインデックスを取得
      let entry = this.entries[index]; // entries配列の指定インデックスにアクセス
      // もしそのインデックスにすでにマッピングが存在する場合は、リンクリスト(next)を辿って既存のkeyを探す
      while (entry) {
        // 既存のkeyが見つかった場合は、valueを更新して終了
        if (entry.key === key) {
          entry.value = value;
          return;
        }
        // 次のエントリに移動
        entry = entry.next;
      }
      // 走査してkeyが見つからなかった場合は、新しいマッピングを追加する
      this.entries[index] = { key, value, next: this.entries[index] }; // entries配列の指定インデックスに新しいエントリを設定
      this.size++; // マッピング数を増やす
    },
    remove(key) {
      // keyのマッピングを削除する
      const index = this.hash(key); // keyをハッシュ値に変換してインデックスを取得
      let entry = this.entries[index]; // entries配列の指定インデックスにアクセス
      if (!entry) {
        // もしそのインデックスにマッピングが存在しない場合は、"keyが存在しない"を返す
        return "keyが存在しない";
      }
      // もしそのインデックスにマッピングが存在する場合は、リンクリスト(next)を辿ってkeyを探す
      while (entry) {
        if (entry.key === key) {
          // もしkeyが見つかった場合は、マッピングを削除する
          if (entry.next) {
            // 次のエントリが存在する場合は、次のエントリを現在のインデックスに設定
            this.entries[index] = entry.next;
          } else {
            // 次のエントリが存在しない場合は、現在のインデックスをundefinedに設定
            this.entries[index] = undefined;
          }
          this.size--; // マッピング数を減らす
          return; // 削除完了
        }
        // 次のエントリに移動
        entry = entry.next;
      }
    },
    hash(key) {
      // keyをハッシュ値に変換する関数
      let hash = 0;
      // 文字列keyの各文字を取り出してその文字コードを足し合わせる処理→今回はこれをハッシュ値とする
      for (let i = 0; i < key.length; i++) {
        // key.charCodeAt(i)は、keyのi番目の文字のUnicodeコードポイントを返す
        hash += key.charCodeAt(i);
      }
      //ハッシュ値を配列の長さで割った余りを返すことで、配列のインデックスに変換する
      //変換する理由は、ただ足すだけだとハッシュ値が大きくなりすぎて(例：hash=256)、配列のサイズ(capacity.length)に入らなくなる
      //割った余りをインデックスに使用することで、必ず0~capacity-1の範囲に収まる
      return hash % this.entries.length; // 配列のインデックスに変換
    }
  };
}

function sample() {
  const hashTable = newHashTable(10);
  console.log(hashTable); // => { size: 0, entries: [ <10 empty items> ], ... }
  hashTable.put("key1", "value1");
  hashTable.put("key31", { value: "value2" });
  hashTable.put("key13", "value3");

  console.log(`size=${hashTable.size}`); // => size=2
  console.log(`key1=${hashTable.get("key1")}`); // => key1=value1
  console.log(`key2=${JSON.stringify(hashTable.get("key2"))}`); // => key2={"value":"value2"}
  console.log(JSON.stringify(hashTable.entries[hashTable.hash("key31")])); // => {"key":"key31","value":{"value":"value2"},"next":{"key":"key1","value":"value1","next":null}}

  hashTable.put("key2", "new value");

  console.log(`key2=${hashTable.get("key2")}`); // => key2=new value

  hashTable.remove("key2");

  console.log(`key2=${hashTable.get("key2")}`); // => key2=undefined
  console.log(`size=${hashTable.size}`); // => size=1

}

console.log(sample());
console.log(hash("key1"));
console.log(hash("key31"));
console.log(hash("key13"));
function hash(key) {
  const capacity = 10;
  let hash = 0;
  // 文字列keyの各文字を取り出してその文字コードを足し合わせる処理→今回はこれをハッシュ値とする
  for (let i = 0; i < key.length; i++) {
    // key.charCodeAt(i)は、keyのi番目の文字のUnicodeコードポイントを返す
    hash += key.charCodeAt(i);
  }
  return hash % capacity; // 配列のインデックスに変換
}

