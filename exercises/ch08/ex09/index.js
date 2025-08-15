//与えられたテストを見ると、withResponseを呼び出すとき、第二引数にコールバック関数を渡している((res)の部分)
//resはwithResourceの第一引数であるresourceを指している
export function withResource(resource, process) {
    //try-finally構文を使って、終了時必ずclose()を呼び出す
    try {
        // processはコールバック関数なので、引数にresourceを渡して実行する
        //例えば、一つ目のテストだとres.doA();, res.doB();が実行される
        process(resource);
    } finally {
        resource.close();
    }
}

//メモ
//コールバック関数：　他の関数に引数として渡され、何らかのタイミングで呼び出される関数
//一つ目のテストだと、第一引数に
// const resource = {
//     called: [],
//     doA() {
//       this.called.push("doA");
//     },
//     doB() {
//       this.called.push("doB");
//     },
//     close() {
//       this.called.push("close");
//     },
//   };
// を渡し、第二引数に
// (res) => {
//     res.doA();
//     res.doB();
//   }
//を渡している
// よって、process(resource)はresorceの中のメソッドをそれぞれ実行していることになる
