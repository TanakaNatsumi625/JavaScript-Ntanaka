import { C, C1, C2 } from "./index.js"; 

describe("C", () => {
  let c;
  beforeEach(() => {
    c = new C();
  });

  test("xプロパティに直接アクセスできる", () => {
    expect(c.x).toBe(42);
  });

  test("getterを使ってアクセスもできる", () => {
    expect(c.X).toBe(42);
  });
});

describe("C1", () => {
    let c1;
    beforeEach(() => {
        c1 = new C1();
    });
    
    test("プライベートフィールドに直接アクセスできない", () => {
        expect(c1.x).toBeUndefined();
    });
    
    test("getterを使ってアクセスできる", () => {
        expect(c1.X).toBe(42);
    });
    });

describe("C2", () => {
    let c2;
    beforeEach(() => {
        c2 = new C2();
    });

    test("xプロパティに直接アクセスできない", () => {
        expect(c2.x).toBeUndefined();
    });

    test("メソッドを使ってアクセスできる", () => {
        expect(c2.X()).toBe(42);
    });
});