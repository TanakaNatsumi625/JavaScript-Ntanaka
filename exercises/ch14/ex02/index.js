export class MyArrayLike {
  // TODO
  constructor(items){
    //配列または数値を受け取る
    //配列の場合は要素をコピー、数値の場合はlengthを設定
    if(Array.isArray(items)){
      this.length = items.length;
      for(let i = 0; i < items.length; i++){
        this[i] = items[i];
      }
    } else if(typeof items === 'number'){
      this.length = items;
    } else {
      this.length = 0;
    }
  }

}

export class MyArray extends Array {
  constructor(items) {
    super(...items);
  }

  // TODO
  //返り値のクラスをMyArrayLikeに変更
  static get [Symbol.species]() {
    return MyArrayLike;
  }
  get first(){ return this[0]; }
  get last(){ return this[this.length -1]; }
}

//動作確認
let array = new MyArray([10,20,30,40,50]);
let result = array.map(x => x + 5);
console.log(result);
console.log(result instanceof MyArrayLike);
console.log(result.length);
console.log(Array.from(result));
