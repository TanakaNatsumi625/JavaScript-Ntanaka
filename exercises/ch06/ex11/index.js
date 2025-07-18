export function makeObject(x, y) {
    console.log("makeObject called with x:", x, "y:", y);
 let obj = {
    r: 4,
    theta: Math.PI/4,
    get descartes() {return { x: this.r * Math.cos(this.theta), y: this.r * Math.sin(this.theta) }; },
    set descartes(value) {
      if (isNaN(value.x) || isNaN(value.y)) {
        throw new Error("x and y must be numbers");
      }
        this.r = Math.sqrt(value.x ** 2 + value.y ** 2);
        this.theta = Math.atan2(value.y, value.x);
    }
 };

 obj.descartes = { x: x, y: y };
   
 //動作確認
 console.log(obj.r);
 console.log(obj.theta);
 console.log(obj.descartes);
 obj.descartes = {x: x, y: y};
 console.log(obj.r);
 console.log(obj.theta);
 console.log(obj.descartes);

 return obj;
}

makeObject(7, 8); // 動作確認のための呼び出し