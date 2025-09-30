import { TypeMap } from "./index.js";

describe('TypeMap', () => {
    let typeMap;

    beforeEach(() => {
        typeMap = new TypeMap();
    });
    test('should set and get primitive types correctly', () => {
        typeMap.set(String, 'String');
        typeMap.set(Number, 123);
        typeMap.set(Boolean, true);

        expect(typeMap.get(String)).toBe('String');
        expect(typeMap.get(Number)).toBe(123);
        expect(typeMap.get(Boolean)).toBe(true);
    });
    test('should set and get class instances correctly', () => {
        class MyClass {}
        const myInstance = new MyClass();
        typeMap.set(MyClass, myInstance);

        expect(typeMap.get(MyClass)).toBe(myInstance);
    });
    test('should throw error for non-constructor keys', () => {
        expect(() => typeMap.set('notAFunction', 'value')).toThrow(TypeError);
        expect(() => typeMap.set(123, 'value')).toThrow(TypeError);
        expect(() => typeMap.set({}, 'value')).toThrow(TypeError);
    });
});