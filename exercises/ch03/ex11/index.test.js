import { equals } from "./index.js";

test("ch03-ex11", () => {
    // 厳密等価なら true
    expect(equals(42, 42)).toBe(true);
    expect(equals(null, null)).toBe(true);

    // 厳密等価ではない場合オブジェクト以外が指定されれば false
    expect(equals({x: 42}, 42)).toBe(false);
    expect(equals(null, {x: 42})).toBe(false);

    // プロパティの数・名前が一致しなければ false
    expect(equals({ x: 1 }, { y: 1 })).toBe(false); 
    expect(equals({ x: 1 }, { x: 1, y: 1 })).toBe(false); 

    // プロパティの各値を equals で再帰的に比較
    expect(equals({ x: { y: { z: 10 } } }, { x: { y: { z: 10 } } })).toBe(true); // true
    expect(equals({ x: { y: { z: 10 } } }, { x: { y: { z: 10, w: 1 } } })).toBe(false); // false
});