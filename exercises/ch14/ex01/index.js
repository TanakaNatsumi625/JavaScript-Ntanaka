export function unwritableAndUnconfigurableObj() {
    const obj = {};

    Object.defineProperty(obj, 'a', {
        value: 1,
        writable: false,
        configurable: false,
        enumerable: true
    });

    return obj;
}

export function writableAndUnconfigurableObj() {
  const obj = {};
  Object.defineProperties(obj, {
    b: {
      value: 2,
      writable: true,
      configurable: false,
      enumerable: true
    },
  });
  return obj;
}

export function nestedUnwritableObj() {
  // 最深部から作る
  const eObj = {};
  Object.defineProperty(eObj, 'e', {
    value: 3,
    writable: false,
    configurable: false,
    enumerable: true
  });
  Object.preventExtensions(eObj); // 追加禁止

  const dObj = {};
  Object.defineProperty(dObj, 'd', {
    value: eObj,
    writable: false,
    configurable: false,
    enumerable: true
  });
  Object.preventExtensions(dObj);

  const cObj = {};
  Object.defineProperty(cObj, 'c', {
    value: dObj,
    writable: false,
    configurable: false,
    enumerable: true
  });
  Object.preventExtensions(cObj);

  // ルートオブジェクトも拡張不可
  const root = {};
  Object.defineProperty(root, 'c', {
    value: cObj.c,
    writable: false,
    configurable: false,
    enumerable: true
  });
  Object.preventExtensions(root);

  return root;
}


console.log(unwritableAndUnconfigurableObj());
console.log(writableAndUnconfigurableObj());
console.log(nestedUnwritableObj());