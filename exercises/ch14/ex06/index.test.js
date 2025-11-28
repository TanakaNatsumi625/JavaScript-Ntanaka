import { makeProxyAndLogs } from "./index.js";

describe("makeProxyAndLogs関数のテスト", () => {
    test("メソッド呼び出しのログが正しく記録されること", () => {
        const a = {
            p: 1,
            f: (x, y) => {
                return x + y;
            },
        };

        const [proxy, logs] = makeProxyAndLogs(a);

        console.log(logs); // []
        console.log(proxy.p); // 1
        console.log(proxy.f(1, 2)); // 3
        console.log(logs); // [{ name: "f", args: [1, 2], timestamp: ... }]
    });
    test("引数が数値でない場合にTypeErrorがスローされること", () => {
        const a = {
            p: 1,
            f: (x, y) => {
                return x + y;
            },
        };

        const [proxy, logs] = makeProxyAndLogs(a);

        expect(() => { proxy.f(1, "2");}).toThrow(TypeError);
    });
});