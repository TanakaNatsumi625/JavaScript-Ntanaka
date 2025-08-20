// //classを使った実装
class Soldier {
    constructor(atc){
        this.atc = atc;
    };
    attack(){
        return this.atc*2; //攻撃力を2倍にして返す
    }
}

export class MagicSoldier extends Soldier{
    constructor(atc, mgc){
        super(atc); //親クラスのコンストラクタを呼び出す
        this.mgc = mgc;
    }
    
    attack(){ //攻撃力を2倍にして、魔法攻撃力を足して返す
        return super.attack() + this.mgc;
    }
}

//動作確認
const s = new Soldier(10);
console.log(s.attack()); // 20
const ms = new MagicSoldier(10, 5);
console.log(ms.attack()); // 25