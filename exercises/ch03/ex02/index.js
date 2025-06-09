console.log("max integer= ", Number.MAX_SAFE_INTEGER);
//max integer=  9007199254740991
console.log("min integer= ", Number.MIN_SAFE_INTEGER);
//min integer=  -9007199254740991
console.log("max integer+1= ", Number.MAX_SAFE_INTEGER + 1);
//max integer+1=  9007199254740992
console.log("max integer+2= ", Number.MAX_SAFE_INTEGER + 2);
//max integer+2=  9007199254740992
console.log(Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2);
//true
//最大値+1 と最大値+2両方とも最大値を超えてしまうので、精度の限界により正確に違いを表現できなるなるから。
//ID等のようにincrementする場合は、integerの精度の限界を超える可能性があるので、BigInt型(Long型)使う必要ある