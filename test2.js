function compose(...funcs) {
  // 返回一个函数，这个函数负责执行所有的函数
  return (initialValue) => {
    return funcs.reduceRight((value, fn) => fn(value), initialValue);
  };
}
