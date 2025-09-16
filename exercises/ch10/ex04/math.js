function add(a, b) {
    return a + b;
  }

class Calculator {
    multiply(a, b) {
        return a * b;
    }
}

//デフォルトエクスポート
export default add;

//名前付きエクスポート
export { Calculator };
