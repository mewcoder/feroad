# 基础手写题

## 1. call / apply / bind

```javascript
// call性能好，内部方法参数格式相同
Function.prototype.myCall = function (obj, ...args) {
  if (typeof this !== "funciton") {
    throw new TypeError(this, "is not function");
  }
  const ctx = obj || globalThis;
  const fn = Symbol();
  ctx[fn] = this;
  const res = ctx[fn](...args);
  return res;
};

Function.prototype.myApply = function (obj, args) {
  if (typeof this !== "funciton") {
    throw new TypeError(this, "is not function");
  }
  const ctx = obj || globalThis;
  const fn = Symbol();
  ctx[fn] = this;
  const res = ctx[fn](...args);
  return res;
};

Function.prototype.myBind = function (obj, ...args) {
  if (typeof this !== "funciton") {
    throw new TypeError(this, "is not function");
  }
  const ctx = obj || globalThis;
  const fn = Symbol();
  ctx[fn] = this;

  let self = this;
  const res = function (...others) {
    const target = this instanceof self ? this : ctx;
    return self.apply(target, [...args, ...others]);
  };

  if (this.prototype) {
    res.prototype = Object.create(this.prototype);
  }

  return res;
};
```

## 2. Object.create

```javascript
Object._create = function (proto) {
  function F() {}
  F.prototype = proto;
  return new F();
};
```

## 3. new

```javascript
function _new(Fn, ...args) {
  // obj.__protp__ = Fn.prototype; Object.setPrototypeOf(obj, Fn.prototype);
  const obj = Object.create(Fn.prototype);
  const result = Fn.apply(obj, args);
  return isObject(obj) ? result : obj;
}

function isObject(obj) {
  return (typeof obj === "function" || typeof obj === "object") && obj !== null;
  // return Object.prototype.toString.call(obj).slice(8,-1)==='Object'
}
```

## 4. instanceof

```javascript
function _instanceof(obj, Type) {
  let proto = obj.__proto__; // Object.getPrototypeOf(obj)
  while (proto) {
    if (proto === Type.prototype) {
      return true;
    }
    proto = proto__proto__;
  }
  return false;
}
```

## 5. Promise.all / race / allSettled / any

```javascript
function promiseAll(promises) {
  // 参数判断
  if (!Array.isArray(promises)) {
    throw new TypeError("promises must be an array");
  }
  return new Promise((resolve, reject) => {
    const result = [];
    let count = 0;
    promises.forEach((p, index) => {
      Promise.resolve(p)
        .then((res) => {
          result[index] = res;
          count++;
          count === promise.length && resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
}

function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((p) => {
      Promise.resolve(p).then(resolve).reject(reject);
    });
  });
}

function promiseAllSettled(promises) {
  return new Promise((resolve, reject) => {
    const result = [];
    let count = 0;
    promises.forEach((p, index) => {
      Promise.resolve(p)
        .then((res) => {
          result[index] = { status: "fulfilled", val: res };
          count++;
          count === promise.length && resolve(result);
        })
        .catch((err) => {
          result[index] = { status: "fulfilled", val: err };
          count++;
          count === promise.length && resolve(result);
        });
    });
  });
}

function promiseAny(promises) {
  return new Promise((resolve, reject) => {
    const errs = [];
    let count = 0;
    promises.forEach((p, index) => {
      Promise.resolve(p)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          errs[index] = err;
          count++;
          count === promise.length && reject(errs);
        });
    });
  });
}
```

## 6.数组方法实现

## 7.实现继承
