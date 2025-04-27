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
    add(myPointX, myPointY) { 
        const addPointX = this.x + myPointX; 
        const addPointY = this.y + myPointY;
        console.log(addPointX, addPointY); //コンソールに出力する
        return addPointX, addPointY; //足し算した座標を返す
    };
};

export function addPoint (myPointX, myPointY){
    const point = new Point(1, 1); //インスタンスを作成。座標(1.1)
    point.distance(); //メソッドを呼び出す。√2が返る
    point.add(myPointX, myPointY); 
}

//動作確認
addPoint(3, 4); 


