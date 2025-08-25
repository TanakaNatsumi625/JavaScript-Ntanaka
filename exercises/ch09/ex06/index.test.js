import { TypedMap } from "./index.js";

describe("TypedMap", () => {
    test("string型のキーとnumber型の値を持つTypedMapを作成し、正しい型のデータを追加できる", () => {
        const tm = new TypedMap("string", "number", [["one", 1], ["two", 2]]);
        expect(tm.map.get("one")).toBe(1);
        tm.set("three", 3);
        expect(tm.map.get("three")).toBe(3);
    });

    test("不正な型のキーを追加しようとするとTypeErrorがスローされる", () => {
        const tm = new TypedMap("string", "number");
        expect(() => {
            tm.set(4, 4); // キーがstring型ではない
        }).toThrow(TypeError);
    });

    test("不正な型の値を追加しようとするとTypeErrorがスローされる", () => {
        const tm = new TypedMap("string", "number");
        expect(() => {
            tm.set("four", "4"); // 値がnumber型ではない
        }).toThrow(TypeError);
    });

    test("初期化時に不正な型のエントリを含む場合、TypeErrorがスローされる", () => {
        expect(() => {
            new TypedMap("string", "number", [["one", 1], ["two", "2"]]); // 二番目の値がnumber型ではない
        }).toThrow(TypeError);
    });
});