import { newHashTable } from "./index.js";

describe("newHashTable", () => {
    it("マッピング追加テスト", () => {
        const hashTable = newHashTable(10);
        hashTable.put("key1", "value1");
        expect(hashTable.get("key1")).toBe("value1");
        expect(hashTable.size).toBe(1);
    });

    it("マッピング追加・取得テスト：keyが一致している場合、valueを書き換える", () => {
        const hashTable = newHashTable(10);
        hashTable.put("key1", "value1");
        hashTable.put("key1", "value2");
        expect(hashTable.get("key1")).toBe("value2");
        expect(hashTable.size).toBe(1);
    });

    it("マッピング追加・取得テスト：異なるkeyを追加すると、マッピング数が増える", () => {
        const hashTable = newHashTable(10);
        hashTable.put("key1", "value1");
        hashTable.put("key2", "value2");
        expect(hashTable.get("key1")).toBe("value1");
        expect(hashTable.get("key2")).toBe("value2");
        expect(hashTable.size).toBe(2);
    });

    it("マッピング追加・取得テスト：異なる key でハッシュ値を変換したインデックスが衝突した場合は、リンクリスト形式で複数のマッピングを保持する", () => {
        const hashTable = newHashTable(10);
        hashTable.put("key1", "value1");
        hashTable.put("key31", "value2");
        hashTable.put("key13", "value3");
        expect(hashTable.get("key1")).toBe("value1");
        expect(hashTable.get("key31")).toEqual("value2");
        expect(hashTable.get("key13")).toBe("value3");
        expect(JSON.stringify(hashTable.entries[hashTable.hash("key31")])).toEqual("{\"key\":\"key13\",\"value\":\"value3\",\"next\":{\"key\":\"key31\",\"value\":\"value2\"}}");
    });

    it("マッピング取得テスト：key名が存在しないとき、undefinedを返す", () => {
        const hashTable = newHashTable(10);
        expect(hashTable.get("nonExistingKey")).toBeUndefined();
    });

    it("マッピング削除テスト", () => {
        const hashTable = newHashTable(10);
        hashTable.put("key1", "value1");
        hashTable.remove("key1");
        expect(hashTable.get("key1")).toBeUndefined();
        expect(hashTable.size).toBe(0);
    });

    it("マッピング削除テスト：存在しないkeyを削除しようとすると、'keyが存在しない'を返す", () => {
        const hashTable = newHashTable(10);
        expect(hashTable.remove("nonExistingKey")).toBe("keyが存在しない");
        expect(hashTable.size).toBe(0);
    });
});