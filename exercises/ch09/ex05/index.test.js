import { instanceOf } from "./index.js";

describe("多段に継承したクラスのインスタンスと基底クラスのコンストラクタを入力する", () => {
    //例えば、前問のRPGの戦士クラスト魔法戦士クラスで考えてみる
    class Soldier {
        constructor(atc){
            this.atc = atc;
        };
        attack(){
            return this.atc*2; //攻撃力を2倍にして返す
        }
    }
    
    class MagicSoldier extends Soldier{
        constructor(atc, mgc){
            super(atc); //親クラスのコンストラクタを呼び出す
            this.mgc = mgc;
        }
        
        attack(){ //攻撃力を2倍にして、魔法攻撃力を足して返す
            return super.attack() + this.mgc;
        }
    }

    //さらに継承して、スーパーマジック戦士クラスを作る
    class SuperMagicSoldier extends MagicSoldier {
        constructor(atc, mgc, spc) {
            super(atc, mgc);
            this.spc = spc;
        }

        attack() {
            return super.attack() + this.spc;
        }
    }
    test("SuperMagicSoldierはMagicSoldierのインスタンスである", () => {
        const result = instanceOf(new SuperMagicSoldier(10, 5, 3), MagicSoldier);
        expect(result).toBe(true);
    });
    test("SuperMagicSoldierはSoldierのインスタンスである", () => {
        const result = instanceOf(new SuperMagicSoldier(10, 5, 3), Soldier);
        expect(result).toBe(true);
    });
    test("MagicSoldierはSoldierのインスタンスである", () => {
        const result = instanceOf(new MagicSoldier(10, 5), Soldier);
        expect(result).toBe(true);
    });
});

describe("継承関係にないインスタンスとクラスのコンストラクタを入力する", () => {
    class Soldier {
        constructor(atc){
            this.atc = atc;
        };
        attack(){
            return this.atc*2; //攻撃力を2倍にして返す
        }
    }
    
    class MagicSoldier extends Soldier{
        constructor(atc, mgc){
            super(atc); //親クラスのコンストラクタを呼び出す
            this.mgc = mgc;
        }
        
        attack(){ //攻撃力を2倍にして、魔法攻撃力を足して返す
            return super.attack() + this.mgc;
        }
    }
    //敬称関係ないクラスを定義してみる
    class Archer {
        constructor(atc){
            this.atc = atc;
        };
        attack(){
            return this.atc * 1.5; //攻撃力を1.5倍にして返す
        }
    }

    test("MagicSoldierはArcherのインスタンスではない", () => {
        const result = instanceOf(new MagicSoldier(10, 5), Archer);
        expect(result).toBe(false);
    });
    test("ArcherはSoldierのインスタンスではない", () => {
        const result = instanceOf(new Archer(10), Soldier);
        expect(result).toBe(false);
    });
});