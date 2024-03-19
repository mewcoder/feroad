function sum(...args) {
  const arr = [...args];
  function add(...rest) {
    arr.push(...rest);
    return add;
  }
  add.toString = () => arr.reduce((pre, cur) => pre + cur, 0);
  return add;
}

console.log("sum:" + sum(2)(3));
console.log("sum:" + sum(2, 3)(3)(4));
