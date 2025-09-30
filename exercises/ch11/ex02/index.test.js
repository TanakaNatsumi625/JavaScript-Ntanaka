import { cache } from "./index.js";

describe('cache', () => {
    let callCount;
    let slowFn;
    let cachedSlowFn;
    let obj1;
    let obj2;
    beforeEach(() => {
        callCount = 0;
        slowFn = (obj) => {
            callCount++;
            return obj.value * 2;
        };
        cachedSlowFn = cache(slowFn);
        obj1 = { value: 1 };
        obj2 = { value: 2 };
    });
    test('should cache results for the same object', () => {
        expect(cachedSlowFn(obj1)).toBe(2);
        expect(cachedSlowFn(obj1)).toBe(2);
        expect(callCount).toBe(1); // slowFn should be called only once
    });
    test('should not cache results for different objects', () => {
        expect(cachedSlowFn(obj1)).toBe(2);
        expect(cachedSlowFn(obj2)).toBe(4);
        expect(callCount).toBe(2); // slowFn should be called for both obj1 and obj2
    });
});
