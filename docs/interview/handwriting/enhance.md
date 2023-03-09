# 综合应用篇

## 并发请求控制

```js
class Scheduler {
  constructor(n) {
    this.max = n || 2;
    this.num = 0;
    this.task = []; // 当前执行任务队列
  }

  add(t) {
    this.task.push(t);
    this.run();
  }

  run() {
    if (this.num < this.max && this.task.length) {
      this.num++;
      const fn = this.task.shift();
      // 考虑优先级的话，排个序再取出
      // const { fn } = this.task.sort((a, b) => b.priority - a.priority).shift();
      fn()
        .then(() => {
          this._next();
        })
        .catch(() => {
          this._next();
        });
    }
  }

  _next() {
    this.num--;
    this.run();
  }
}
```

## 大数相加

```js
// leetcode 415
function addStrings(num1, num2) {
  let i = num1.length - 1;
  let j = num2.length - 1;
  let add = 0;
  const ans = [];
  while (i >= 0 || j >= 0 || add > 0) {
    const a = i >= 0 ? Number(num1[i]) : 0;
    const b = j >= 0 ? Number(num2[j]) : 0;
    const res = a + b + add;
    ans.push(res % 10);
    add = Math.floor(res / 10);
    i--;
    j--;
  }
  return ans.reverse().join("");
}
```

## 数组和树转换

```js
function list2Tree(list) {
  // 用于 id 和 treeNode 的映射
  const nodeMap = new Map();
  let root = null;

  list.forEach((item) => {
    nodeMap.set(item.id, item);
  });

  list.forEach((item) => {
    const { parentId } = item;
    // 找到根节点
    if (parentId === -1) {
      root = item;
      return;
    }
    // 找到 parentNode 并加入到它的 children
    const parentNode = nodeMap.get(parentId);
    if (parentNode) {
      !parentNode.children && (parentNode.children = []);
      parentNode.children.push(item);
    }
  });
  return root;
}

function tree2List(root) {
  const res = [];
  const queue = [root];
  while (queue.length) {
    const node = queue.pop();
    if (!node) break;
    const { id, name, parentId, children = [] } = node;
    res.push({ id, name, parentId });
    children.forEach((child) => {
      queue.unshift(child);
    });
  }
  return res;
}
```

## 解析 url 参数为对象

```js
// one-line
Object.fromEntries(new URLSearchParams(location.search));
```

## LazyMan

```js
/**
 * @desc 手写 LazyMan ，实现 sleep 和 eat 两个方法，支持链式调用
 */
export class LazyMan {
  constructor(name) {
    this.name = name;
    this.tasks = [];
    // 调用
    setTimeout(() => {
      this._next();
    });
  }
  _next() {
    const task = this.tasks.shift();
    task && task();
  }
  eat(foot) {
    const task = () => {
      console.log(`${this.name} is eating ${foot}`);
      this._next();
    };
    this.tasks.push(task);
    return this;
  }
  sleep(time) {
    const task = () => {
      setTimeout(() => {
        console.log(`${this.name} sleep ${time}s`);
        this._next();
      }, 1000 * time);
    };
    this.tasks.push(task);
    return this;
  }
}
```
