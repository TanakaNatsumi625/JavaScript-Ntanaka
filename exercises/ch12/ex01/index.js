function counterIter(max) {
  console.log("counterIter");
  let c = 1;
  return {
    [Symbol.iterator]() {
      console.log("counterIter: Symbol.iterator");
      return this;
    },
    next() {
      console.log("counterIter: next");
      if (c >= max + 1) {
        return { value: undefined, done: true };
      }
      const value = c;
      c++;
      return { value, done: false };
    },
    return(value) {
      console.log("counterIter: return:", value);
      return { value, done: true };
    },
    throw(e) {
      console.log("counterIter: throw:", e);
      throw e;
    },
  };
}

function* counterGen(max) {
  console.log("counterGen");
  try {
    for (let c = 1; c <= max; c++) {
      console.log("counterGen: next");
      yield c;
    }
  } catch (e) {
    console.log("counterGen: catch:", e);
    throw e;
  } finally {
    console.log("counterGen: finally");
  }
}

//課題の調査用のコード
console.log("=== 明示的に next() を呼ぶ ===");
let iter1 = counterIter(3);
let gen1 = counterGen(3);
console.log(iter1.next());
console.log(iter1.next());
console.log(gen1.next());
console.log(gen1.next());

console.log("=== 明示的に return() を呼ぶ ===");
console.log(iter1.return("end"));
console.log(gen1.return("end"));

console.log("=== 明示的に throw() を呼ぶ ===");
let iter2 = counterIter(3);
iter2.next();
try {
  iter2.throw(new Error("Iter error"));
} catch (e) {}
let gen2 = counterGen(3);
gen2.next();
try {
  gen2.throw(new Error("Gen error"));
} catch (e) {}

console.log("=== for-of ループ ===");
for (let v of counterIter(3)) {
  console.log("value:", v);
}
for (let v of counterGen(3)) {
  console.log("value:", v, "next:", gen2.next());
}

console.log("=== for-of break ===");
for (let v of counterIter(3)) {
  console.log("value:", v);
  break;
}
for (let v of counterGen(3)) {
  console.log("value:", v);
  break;
}

console.log("=== for-of 例外発生 ===");
try {
  for (let v of counterIter(3)) {
    console.log("value:", v);
    if (v === 2) throw new Error("Iter break");
  }
} catch (e) {}
try {
  for (let v of counterGen(3)) {
    console.log("value:", v);
    if (v === 2) throw new Error("Gen break");
  }
} catch (e) {}
