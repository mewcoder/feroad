## 1. 防抖/节流

```javascript
function debounce(fn, timeout) {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, timeout);
  };
}
// 缺点：第一次执行延时
```

```javascript
function throttle(fn, timeout) {
  let last = 0;
  return function (...args) {
    let now = Date.now();
    if (now - last >= timeout) {
      last = now;
      fn.apply(this, args);
    }
  };
}
// 缺点：最后一次不执行
```

## 2. 深拷贝

```javascript
function clone(source) {
  if (typeof source === "object") {
    let target = Array.isArray(source) ? [] : {};
    for (const key in source) {
      if (Object.hasOwnProperty(key)) {
        target[key] = clone(source[key]);
      }
    }
    return target;
  }
  return source;
}
```

## 3.发布订阅模式

```javascript
class EventEmitter {
  constructor() {
    this.handlers = {};
  }

  on(eventName, cb) {
    if (!this.handlers[eventName]) {
      this.handlers[eventName] = [];
    }
    this.handlers[eventName].push(cb);
  }

  emit(eventName, ...args) {
    if (this.handlers[eventName]) {
      // 这里需要对 this.handlers[eventName] 做一次浅拷贝，主要目的是为了避免通过 once 安装的监听器在移除的过程中出现顺序问题
      const handlers = this.handlers[eventName].slice();
      handlers.forEach((callback) => {
        callback(...args);
      });
    }
  }

  off(eventName, cb) {
    const callbacks = this.handlers[eventName];
    const index = callbacks.indexOf(cb);
    if (index !== -1) {
      callbacks.splice(index, 1);
    }
  }

  // 为事件注册单次监听器
  once(eventName, cb) {
    // 对回调函数进行包装，使其执行完毕自动被移除
    const wrapper = (...args) => {
      cb(...args);
      this.off(eventName, wrapper);
    };
    this.on(eventName, wrapper);
  }
}
```
