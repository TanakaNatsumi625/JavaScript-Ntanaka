class Point { //クラス名は大文字から始める
    constructor(x, y) { //インスタンス作るときに引数として渡される
        this.x = x;        //this.x = x; 与えられた引数をインスタンスのプロパティに値を代入する
        this.y = y;
    };
    distance() { //メソッドを定義する
        const distance = Math.sqrt(this.x ** 2 + this.y ** 2); 
        console.log(distance); 
        return distance; //this.x, this.yはインスタンスのプロパティを参照する
    };
    add(myPoint) {
        return new Point(this.x + myPoint.x, this.y + myPoint.y); //オブジェクトで返す
    };
};

export function addPoint (myPointX, myPointY) { 
    const point = new Point(1, 1); //インスタンスを作成。座標(1.1)
    point.distance(); //メソッドを呼び出す。√2が返る
    const myPoint = new Point(myPointX, myPointY); //自分の座標(引数)を持つインスタンスを作成
    const sumPoint = point.add(myPoint); //addメソッドを呼び出す
    console.log(sumPoint); 
    return sumPoint;
    
}

//動作確認
addPoint(3, 4); //(4, 5)

//memo
//const sumPoint = point.add(myPoint);で座標を足すメソッドを呼び出しているので、
//this.x, this.yは座標(1, 1)を参照している。

