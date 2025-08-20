//prototypeを使った記法
function Soldier(atc) {
    this.atc = atc;
}
Soldier.prototype = {
    attack: function() {
        return this.atc * 2; //攻撃力を2倍にして返す
    }
}

//サブクラスのコンストラクタ関数
export function MagicSoldier(atc, mgc) {
    Soldier.call(this, atc); //親クラスのコンストラクタを呼び出す→atkフィールドを持たせる
    this.mgc = mgc;
}
//サブクラスのプロトタイプを親クラスのプロトタイプから継承する
//メソッドのオーバーライドを可能にするために、親クラスのプロトタイプをサブクラスのプロトタイプに設定
MagicSoldier.prototype = Object.create(Soldier.prototype);
//しかし↑でコンストラクタもSoldierを指してしまうので、明示的にサブクラスのコンストラクタを設定
MagicSoldier.prototype.constructor = MagicSoldier;
//attackをオーバーライド
MagicSoldier.prototype.attack = function() {
    return Soldier.prototype.attack.call(this) + this.mgc; //親の攻撃力に魔法攻撃力を足して返す
}
//オーバライドは以下のようにも書けるけど、保守性下がる
//親クラスのメソッドを呼び出す書き方の方が、親が変更したときそのまま反映されるので保守性が高い
//親が持っている計算ロジックを再利用する
// MagicSoldier.prototype.attack = function() {
//     return this.atc * 2 + this.mgc; //攻撃力を2倍にして、魔法攻撃力を足して返す
//}

//動作確認
const s = new Soldier(10);
console.log(s.attack()); // 20
const ms = new MagicSoldier(10, 5);
console.log(ms.attack()); // 25