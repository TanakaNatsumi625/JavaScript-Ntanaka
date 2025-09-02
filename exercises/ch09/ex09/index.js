//S：単一責任
//はたしていない例
//以下はユーザーの情報を持つ役割と、データベースに保存する役割と、ユーザー情報を画面に表示する役割を持ってしまっている。
class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
    saveToDatabase() {
        console.log("ユーザー情報をデータベースに保存");
    }

    displayOnScreen() {
        console.log("ユーザー情報を画面に表示");
    }
}
//なので以下のようにそれぞれの役割に分けてクラスを設計する
//ユーザー情報を管理
class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
}
//ユーザー情報をデータベースに保存
class UserRepository {
    save(user) {
        console.log("ユーザー情報をデータベースに保存");
    }
}
//ユーザー情報を画面に表示
class UserView {
    display(user) {
        console.log("ユーザー情報を画面に表示");
    }
}

//O： オープン・クローズド
//はたしていない例
class Rectangle {
    //幅と高さ
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
}
//長方形の面積を計算するクラス
//ここには長方形以外の図形の面積を計算するメソッドを追加すると、既存のコードを変更することになる
//例えば円の面積とか
class AreaCalculator {
    calculateArea(rectangles) {
        const totalArea = 0;
        for (const rectangle of rectangles) {
            totalArea += rectangle.width * rectangle.height;
        }
        return totalArea;
    }
}

//なので以下のように面積を計算するクラスを作成し、各図形クラスで面積計算のメソッドを実装する
//図形の基底クラス(必ずこのメソッドを実装しなさいよという約束事)
class Shape {
    area() {
        throw new Error("This method must be overridden!");
    }
}
//長方形クラス
class Rectangle extends Shape {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }
    //Shapeを継承しているのでcalculateAreaを実装する
    area() {
        return this.width * this.height;
    }
}
//円クラス
class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }
    //Shapeを継承しているのでcalculateAreaを実装する
    area() {
        return Math.PI * this.radius * this.radius;
    }
}
//以上をまとめて面積を計算するクラス
class AreaCalculator {
    calculateArea(shapes) {
        let totalArea = 0;
        for (const shape of shapes) {
            totalArea += shape.area();
        }
        return totalArea;
    }
}

//L：リスコフの置換→親クラスができることは子クラスもできる
//はたしていない例
class Bird {
    fly() {
        console.log("飛んでいます");
    }
}

class Penguin extends Bird {
    fly() {
        //親クラスをオーバーライド
        console.log("ペンギンは飛べません");
    }
}
//親クラスは飛べるのに子クラスのペンギンは飛べない？→親クラスでできることが子クラスでできない
//サブクラスの振る舞いが予測不可能
//なので以下のように飛べる鳥と飛べない鳥でクラスを分ける
class Bird {
    //共通のプロパティやメソッド
    eat() {
        console.log("食べています");
    }
}
class FlyingBird extends Bird {
    fly() {
        console.log("飛んでいます");
    }
}
class NonFlyingBird extends Bird {
    //飛べない鳥なのでflyメソッドは持たない
    //でも親クラスの食べるはできる
}

//I：インターフェース分離の原則→クラスに持たせるインターフェースは最小限に
//はたしていない例
class MultiFunctionPrinter {
    print(document) {
        console.log("印刷しています");
    }
    scan(document) {
        console.log("スキャンしています");
    }
    fax(document) {
        console.log("FAXを送信しています");
    }
}
//例えば古いプリンターがあって印刷しかできない場合、scanやfaxメソッドを持つ必要はない
class OldFashionedPrinter extends MultiFunctionPrinter {
    print(document) {
        console.log("印刷しています");
    }
    scan(document) {
        //古いプリンターなのでスキャンできない
        throw new Error("このプリンターはスキャンできません");
    }
    fax(document) {
        //古いプリンターなのでFAXできない
        throw new Error("このプリンターはFAXできません");
    }
}
//なので以下のようにインターフェースを分ける
class Printer {
    print(document) {
        throw new Error("This method must be overridden!");
    }
}
class Scanner {
    scan(document) {
        throw new Error("This method must be overridden!");
    }
}
class Fax {
    fax(document) {
        throw new Error("This method must be overridden!");
    }
}
class SimplePrinter extends Printer {
    print(document) {
        console.log("印刷しています");
    }
}

class OldFashionedPrinter extends Printer {
    print(document) {
        console.log("印刷しています");
    }
}
class MultiFunctionPrinter extends Printer {
    print(document) {
        console.log("印刷しています");
    }
    scan(document) {
        console.log("スキャンしています");
    }
}

//D：依存関係逆転の原則→高水準モジュールは低水準モジュールに依存してはいけない
//はたしていない例
//DataSaverクラスはMySQLDatabaseクラスに依存している
//データサーバーはデータベースを使う側→高水準モジュール
class MySQLDatabase {
    //保存する
    save(data) {
        console.log("データベースに保存 " + data);
    }
}

class DataSaver {
    constructor(database) {
        this.database = database;
    }

    DataSaver(database) {
        this.database = database;
    }
    saveData(data) {
        //保存するときはMySQLDatabaseクラスのsaveメソッドを使う→直接依存している
        //保存先を変えたかったり、MySQLDatabaseクラスを変更したい場合、DataSaverクラスも変更しなければならない
        this.database.save(data);
    }
}
//よってMySQLDatabaseクラスを変更するとDataSaverクラスも変更しなければならない
//なので以下のようにインターフェースを導入して依存関係を逆転させる
class Database {
    save(data) {
        throw new Error("This method must be overridden!");
    }
}
class MySQLDatabase extends Database {
    save(data) {
        console.log("MySQLデータベースに保存 " + data);
    }
}
class MongoDBDatabase extends Database {
    save(data) {
        console.log("MongoDBデータベースに保存 " + data);
    }
}
class DataSaver {
    constructor(database) {
        this.database = database;
    }

    saveData(data) {
        this.database.save(data);
    }
}


