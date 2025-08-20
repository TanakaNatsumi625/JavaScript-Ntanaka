import { MagicSoldier } from "./index_prototype";
import { MagicSoldier as MagicSoldierClass } from "./index_class";

describe("MagicSoldier", () => {
    let magicSoldierPrototype;
    let magicSoldierClass;

    beforeEach(() => {
        magicSoldierPrototype = new MagicSoldier(10, 5);
        magicSoldierClass = new MagicSoldierClass(10, 5);
    });

    test("プロトタイプベースのMagicSoldierのattackメソッドが正しく計算する", () => {
        expect(magicSoldierPrototype.attack()).toBe(25); // 10*2 + 5
    });

    test("クラスベースのMagicSoldierのattackメソッドが正しく計算する", () => {
        expect(magicSoldierClass.attack()).toBe(25); // 10*2 + 5
    });
});