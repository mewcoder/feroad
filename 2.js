const urls = [
  {
    info: "link1",
    time: 2000,
  },
  {
    info: "link2",
    time: 3000,
  },
  {
    info: "link3",
    time: 3000,
  },
  {
    info: "link4",
    time: 5000,
  },
];

function loadImg(url) {
  return new Promise((resolve, reject) => {
    console.log("--", url.info + "start");
    setTimeout(() => {
      console.log("--", url.info + "end");
      resolve();
    }, url.time);
  });
}

class Scheduler {
  constructor(n) {
    this.max = n || 2;
    this.currentCount = 0;
    this.taskQueue = []; // 当前执行任务队列
  }

  add(task) {
    this.taskQueue.push(task);
    this.run();
  }

  run() {
    if (this.taskQueue.length === 0 || this.currentCount >= this.max) {
      return;
    }

    this.currentCount++;
    const fn = this.taskQueue.shift();

    fn()
      .then(() => {
        this._next();
      })
      .catch(() => {
        this._next();
      });
  }

  _next() {
    this.currentCount--;
    this.run();
  }
}

const scheduler = new Scheduler();

urls.forEach((url) => {
  scheduler.add(() => loadImg(url));
});
