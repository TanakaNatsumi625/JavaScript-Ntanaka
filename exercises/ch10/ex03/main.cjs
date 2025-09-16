//関数
function add(a, b) {
    return a + b;
  }

class Calculator {
    multiply(a, b) {
        return a * b;
    }
}

//外から使えるようにmodule.exportsで公開
module.exports = { add, Calculator };