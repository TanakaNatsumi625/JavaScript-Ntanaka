function addTest(a, b) {
    return a + b;
  }

class Calc {
    multiply(a, b) {
        return a * b;
    }
}

//デフォルトエクスポート
export default addTest;

//名前付きエクスポート
export { Calc as Calculator };
