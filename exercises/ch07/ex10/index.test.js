import {makeFixedSizeArray, DynamicSizeArray} from './index.js';

describe("DynamicSizeArray", () => {
    test("初期状態では長さが0", () => {
      const arr = new DynamicSizeArray();
      expect(arr.length()).toBe(0);
    });
  
    test("push で要素を追加できる", () => {
      const arr = new DynamicSizeArray();
      arr.push("A");
      arr.push("B");
      arr.push("C");
  
      expect(arr.length()).toBe(3);
      expect(arr.get(0)).toBe("A");
      expect(arr.get(1)).toBe("B");
      expect(arr.get(2)).toBe("C");
    });
  
    test("配列のサイズを超えて push すると再配置される", () => {
      const arr = new DynamicSizeArray();
      // 初期サイズは 4 なので、5つ目で再配置される
      arr.push("A");
      arr.push("B");
      arr.push("C");
      arr.push("D");
      arr.push("E");
  
      expect(arr.length()).toBe(5);
      expect(arr.get(4)).toBe("E");
    });
  
    test("set で値を更新できる", () => {
      const arr = new DynamicSizeArray();
      arr.push("A");
      arr.push("B");
      arr.set(1, "Z");
  
      expect(arr.get(1)).toBe("Z");
    });
  });