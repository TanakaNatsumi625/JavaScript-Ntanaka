import { getPropertyNameList } from "./index.js";

describe("getPropertyNameList", () => {
    it("独自プロパティ名の配列を返す。列挙不可、プロパティ名がSymbolも含む", () => {
        let testObj = {
            1: 'one',
            str: 'hello',
            enum: 'enumerable',
            Symbol: Symbol('symbolProperty')
        };

        expect(getPropertyNameList(testObj)).toEqual(['1', 'str', 'enum', 'Symbol']);
        // 列挙不可能なプロパティを追加
        Object.defineProperty(testObj, 'enum2', {
            value: 'notEnumerable',
            enumerable: false,
        });

        expect(getPropertyNameList(testObj)).toEqual(['1', 'str', 'enum','Symbol', 'enum2']);
    });

    it("プロパティが何もない時は空配列を返す", () => {
        expect(getPropertyNameList({})).toEqual([]);
    });
});