async function asyncPool(poolLimit, array, iteratorFn) {
  const task = [];
  const executing = [];
  for (const item of array) {
    const p = Promise.resolve(iteratorFn(item, array));
    task.push(p);
    if (poolLimit <= array.length) {
      // 当任务完成后，从正在执行的任务数组中移除已完成的任务
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e); // 保存正在执行的异步任务
      if (executing.length >= poolLimit) {
        await Promise.race(executing); // await
      }
    }
  }
  return Promise.all(task);
}

async function asyncPool2(promises, poolLimit) {
  return new Promise(async (resolve) => {
    const set = new Set();
    const result = [];
    for (let i = 0; i < promises.length; i++) {
      const p = promises[i];
      const e = p().then((val) => {
        set.delete(e);
        result[i] = val;
        if (result.length === promises.length) resolve(result);
      });
      set.add(e);
      if (set.size >= poolLimit) await [...set][0];
    }
  });
}

const curl = (i) => {
  console.log("开始" + i);
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(i);
      console.log("结束" + i);
    }, 1000 + Math.random() * 1000)
  );
};

let urls = Array(10)
  .fill(0)
  .map((_, i) => i);

// (async () => {
//   const res = await asyncPool(3, urls, curl);
//   console.log(res);
// })();

const inputs = urls.map((i) => () => curl(i));

(async () => {
  const res = await asyncPool2(inputs, 2);
  console.log(res);
})();
