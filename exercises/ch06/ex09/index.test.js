//関数が呼び出されたかを追跡するためモック化
const mock = jest.fn();
const obj = {
  x: 0,
  y: 0,
  sum() {
   // mock();
    return this.x + this.y;
  },
};

// ここに１行のコードを書く
//オブジェクトの中にtoJSONがあった場合、戻り値だけを返す。ない場合は普通にプロパティを返す
obj.toJSON = function () {return { ...this, sum: this.sum() }; };

obj.x = 1;
obj.y = 2;
expect(JSON.stringify(obj)).toBe(`{"x":1,"y":2,"sum":3}`);
expect(mock).toHaveBeenCalled();

//動作確認
// it('toJSONメソッドを追加して、sumプロパティを含むオブジェクトを返す', () => {
//     expect(JSON.stringify(obj)).toBe(`{"x":1,"y":2,"sum":3}`);
// });


