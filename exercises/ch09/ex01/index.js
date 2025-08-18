export class C {
    //C.method()で呼び出せる
    static method() {
        return 1;
    }
    //new C().method()
    method() {
        return 2;
    }
    //クラスCの中に静的プロパティとしてクラスを定義
    //C.C.method()：C.C は 静的プロパティ C に入っているクラス,　そのクラスの 静的メソッド method() を呼んでいる
    static C = class {
        //静的クラスCの中に静的メソッドを定義
        static method() {
        return 3;
        }
        //静的クラスCの中にインスタンスメソッドを定義
        //new C.C().method()：C.C はクラス,　new C.C() → そのクラスのインスタンスを作成，.method() → インスタンスメソッド呼び出し
        method() {
        return 4;
        }
    };
    //クラスCの中にクラスを定義
    //new C().C.method()：new C() → クラス C のインスタンスを作る,　.C → そのインスタンスのプロパティ C,　そのクラスの 静的メソッド method() を呼んでいる
    C = class {
        //クラスCCの中に静的メソッドを定義
        static method() {
        return 5;
        }
        //クラスCCの中にインスタンスメソッドを定義
        //new new C().C().method()：new C() → クラス C のインスタンスを作る,　.C → そのインスタンスのプロパティ C,　() → クラス C のインスタンスを作成,　.method() → インスタンスメソッド呼び出し
        method() {
        return 6;
        }
    };
}

//メモはテストの方に書いた