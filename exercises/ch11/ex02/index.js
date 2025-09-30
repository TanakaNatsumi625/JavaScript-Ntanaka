// f はオブジェクトを1つ引数に取る関数
export function cache(f) {
  // この関数を実装する
  const cacheMap = new WeakMap();
  return function (obj) {
    //キャッシュがあれば返す
    if (cacheMap.has(obj)) {
      return cacheMap.get(obj);
    }
    //なければ計算してキャッシュ
    const result = f(obj);
    cacheMap.set(obj, result);
    return result;
  };
}

function slowFn(obj) {
  // 時間のかかる処理
  console.log('時間がかかる処理')
  return obj.a * 2;
}

// cachedSlowFnを同じ引数で複数回呼び出すと、2回目以降はキャッシュが返る
const cachedSlowFn = cache(slowFn);

//動作確認
const obj = { a: 1 };
console.log(cachedSlowFn(obj)); // 時間のかかる処理が実行される
console.log(cachedSlowFn(obj)); // キャッシュが返るので、時間のかかる処理は実行されない

const obj2 = { b: 2 };
console.log(cachedSlowFn(obj2));
