import { makeObject } from "./index.js";

describe("makeObject", () => {
    it('デカルト座標を返す', () => {
        const obj = makeObject(7, 8);
        expect(obj.r).toBe(10.63014581273465); 
        expect(obj.theta).toBe(0.851966327173272);
        expect(obj.descartes).toEqual({ x: 7.000000000000001, y: 8 });
    });
    it('xかyにNaNを設定するとエラーを投げる', () => {
        const obj = makeObject(7, 8);
        expect(() => {
            obj.descartes = { x: NaN, y: 8 };
        }).toThrow("x and y must be numbers");
        expect(() => {
            obj.descartes = { x: 7, y: NaN };
        }).toThrow("x and y must be numbers");
    });
});