import { addPoint } from "./index.js";

describe("addPoint", () => {
    it("returns addedpoint (10, 5) when positive point = (9, 5) given", () => {
        expect(addPoint(9, 5)).toEqual({ x: 10, y: 6 });
    });
})

//memo
//オブジェクトの比較にはexpect(...).toEqual(...)
