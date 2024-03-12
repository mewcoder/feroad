# 设计模式

## 前言

### 设计原则

设计原则是设计模式的指导理论，它可以帮助我们规避不良的软件设计。SOLID 指代的五个基本原则分别是：

- 单一功能原则（Single Responsibility Principle）（一个程序只做好一件事）
- 开放封闭原则（Opened Closed Principle）（对扩展开放，对修改封闭）
- 里式替换原则（Liskov Substitution Principle）（子类能覆盖父类，并能出现在父类出现的地方）
- 接口隔离原则（Interface Segregation Principle）（保持接口的单一独立）
- 依赖反转原则（Dependency Inversion Principle）（使用方法只关注接口而不关注具体类的实现）

**为什么需要设计模式？**

- 易读性（使用设计模式能够提升代码的可读性，提升后续开发效率）
- 可拓展性（使用设计模式对代码解耦，能很好地增强代码的易修改性和扩展性）
- 复用性（使用设计模式可以重用已有的解决方案，无需再重复相同工作）
- 可靠性（使用设计模式能够增加系统的健壮性，使代码编写真正工程化）

 

### JavaScript中的设计模式

 JavaScript 是同时支持 面向对象编程（OOP） 和函数式编程（FP）的，而函数为一等公民，**可以作为参数和返回值传递**；而且作为动态解释型语言，可以**用字面量的方式创建对象**（无需先建Class再实例化），而且还可以灵活地扩展对象。

而 23 种设计模式的出现（1995年）一开始是从OOP的思想出发的，没有必要使用 JavaScript 去生搬硬套，看不懂的模式就不看；掌握设计原则和思想和一些经典的设计模式即可。

**设计模式的核心就是分离代码中的可变和不变的地方，抽象和封装**

但如果框架的复杂度很高结合 TypeScript，OOP的设计模式还是可以应用的。

必须的设计模式：

- 创建型：工厂模式、单例模式
- 结构型：代理模式、适配器模式、装饰器模式
- 行为型：策略模式、观察者模式、发布订阅模式、访问者模式



## 创建型模式

创建型就是创建对象的机制

### 工厂模式⭐

分为简单工厂模式、工厂方法模式、抽象工厂模式  [区分](https://www.zhihu.com/question/27125796/answer/1615074467)

个人理解：这个模式在 JS 的应用非常简单，就是定义一个工厂函数用于生产对象或者函数，可以在函数里加一下逻辑判断生产不同的对象。

```js
function createPerson(name, age) {
  return {
    name: name,
    age: age,
    greet() {
      console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
  };
}
const person1 = createPerson('Alice', 25);
const person2 = createPerson('Bob', 30);
```

### 单例模式⭐

这个比较常用，就是保证创建实例的唯一性。

JS 中可以用 Class，也可以使用闭包，核心就是缓存实例。

```js
class Storage{
	static getInstance(){
  	if(!Storage.instance){
    	Storage.instance = new Storage()
    }
    return Storage.instance
  }
  
  getItem(key){
  	return localStorage.getItem(key)
  }
  setItem(key,value){
  	localStorage.setItem(key,value)
  }
}

// 闭包
const getSingleton = (function () {
  let instance = null;
  return function () {
    if (!instance) {
      instance = {};
    }
    return instance;
  };
})();
```

### 生成器模式⭐

用于分步生成复杂对象，链式调用

```js
class ButtonBuilder {
  constructor() {
    this.button = document.createElement('button');
  }

  setBackgroundColor(color) {
    this.button.style.backgroundColor = color;
    return this;
  }

  setText(text) {
    this.button.textContent = text;
    return this;
  }

  build() {
    return this.button;
  }
}

const buttonBuilder = new ButtonBuilder();

// 创建蓝色小型按钮
const blueButton = buttonBuilder
  .setBackgroundColor('blue')
  .setText('Click me')
  .build();
```

### 原型模式

原型模式不仅是一种设计模式，它还是一种**编程范式**，JavaScript 的继承就是基于原型实现的。



## 结构型模式

### 代理模式⭐

不直接访问对象，提供一个代理对象去间接访问。

ES6 就提供了 Proxy ，Vue3使用 Proxy 实现的响应式，包括微前端的 JS 沙箱也用到代理模式。**前端必会**。

应用：图片预加载，事件委托

```js
const proxy = new Proxy(target, {
  get(target, prop) {
    return target[prop];
  },
  set(target, prop, value) {
    target[prop]=value;
    return ture;
  }
});
```



### 适配器模式⭐

在对外接口不变的情况下，解决兼容问题，OOP无关。**前端常用**，如 axios

```js
const getDefaultAdapter = () => {
  let adapter;
  if (typeof XMLHttpRequest !== "undefined") {
    adapter = require("./adapters/xhr");
  } else if (
    typeof process !== "undefined" &&
    Object.prototype.toString.call(process) === "[object process]"
  ) {
    adapter = require("./adapters/http");
  }
  return adapter;
};
```



### 装饰器模式 ⭐

JS 函数是第一公民，可以作为参数传入，用函数包装函数即可实现。

Vue2结合TS使用就是装饰器，但现在前端框架更喜欢函数式编程，提案也还没有正式，所以不常用。

```js
function decorator(fn) {
  return function() {
    console.log('Starting')
    const result = fn.apply(this, arguments)
    console.log('Finished')
    return result
  }
}
```

ES 已有装饰器的提案，通过注解的形式使用。装饰器离不了来自Spring的 AOP 和 IOC 思想，Nest.js 就是践行者。



### 外观模式-了解

隐藏系统的复杂性，提供了一个简单的接口。OOP无关。

其实封装方法或者库就是在践行这种思想，其实经常用到，比如封装axios 

```js
axios.get('/user/12345/permissions')
```



### 享元模式-了解

通过共享多个对象所共有的相同状态，节省内存消耗，要区分内部状态和外部状态。OOP无关。

思路就是怎么复用已创建过的对象，其实经常用到，比如根据标识 cache 起来。

```js
// 定义享元工厂
class FlyweightFactory {
  constructor() {
    this.flyweights = {};
  }

  // 获取共享对象
  getFlyweight(key) {
    if (!this.flyweights[key]) {
      this.flyweights[key] = new ConcreteFlyweight(key);
    }
    return this.flyweights[key];
  }
}


```



### 组合模式-了解

将对象组合成树结构，用统一的方法调用，如菜单和 VNode 就是这种树结构。OOP相关。

但前端一般用字面量定义数据对象，通过方法递归遍历访问，不用类去实例化。



### 桥接模式-了解

分离抽象部分和实现部分，OOP 相关。

前端一般不常用，zrender 这种库应该用的到

```js
const circleShape = new Circle(1, 2, 3, new DrawAPI());
circleShape.draw();

const rectangleShape = new Rectangle(4, 5, 6, 7, new DrawAPI());
rectangleShape.draw();
```



## 行为模式

### 策略模式⭐

代替 if-else/ switch，使用对象封装不同的策略算法，同时也方便扩展；日常开发中应用广泛，Vue源码中的合并策略使用了该模式

```js
const strategies = {
  add: function(num1, num2) {
    return num1 + num2;
  },
  subtract: function(num1, num2) {
    return num1 - num2;
  },
  multiply: function(num1, num2) {
    return num1 * num2;
  },
  divide: function(num1, num2) {
    return num1 / num2;
  }
};

function calculate(operation, num1, num2) {
  if (strategies[operation]) {
    return strategies[operation](num1, num2);
  }
}
```

### 观察者模式⭐

必会，Vue 的 响应式就是采用的观察者模式。

```js
class Subject {
  constructor() {
    this.observers = []; // 存储观察者
  }
  addObserver(observer) {
    this.observers.push(observer);
  }
  removeObserver(observer) {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }
  notify() {
    for (const observer of this.observers) {
      observer.update();
    }
  }
}

class Observer {
  constructor(name) {
    this.name = name;
  }

  update() {
    console.log(`${this.name} has been notified!`);
  }
}

// 创建主题对象和观察者对象
const subject = new Subject();
const observer1 = new Observer('Observer 1');
const observer2 = new Observer('Observer 2');

// 将观察者添加到主题对象中
subject.addObserver(observer1);
subject.addObserver(observer2);

// 主题对象发生改变，通知观察者
subject.notify();
```

### 发布-订阅模式⭐

和观察者不同，发布者（被观察者）和订阅者（观察者）不直接联系，而是需要一个事件中心去发布和订阅事件。

必会，没啥好说的。

```js
class EventEmitter {
  constructor() {
    this.handlers = {}
  }

  on(eventName, cb) {
    if (!this.handlers[eventName]) {
      this.handlers[eventName] = []
    }
    this.handlers[eventName].push(cb)
  }

  emit(eventName, ...args) { 
    if (this.handlers[eventName]) { 
      const handlers = this.handlers[eventName].slice()
      handlers.forEach((callback) => {
        callback(...args)
      })
    }
  }

  off(eventName, cb) {
    const callbacks = this.handlers[eventName]
    const index = callbacks.indexOf(cb)
    if (index !== -1) {
      callbacks.splice(index, 1)
    }
  }

  once(eventName, cb) {
    const wrapper = (...args) => {
      cb(...args)
      this.off(eventName, wrapper)
    }
    this.on(eventName, wrapper)
  }
}
```

### 访问者模式⭐

用于遍历和访问数据结构，如AST等，虽然像策略模式，访问者模式是为了操作对象，将数据结构和算法分开；而策略模式是将算法和使用场景分开。

应用：babel 插件

```js
// 定义访问者对象
const visitor = {
  // 对象节点的处理函数
  visitObject(obj) {
    console.log("Visiting object:", obj);
  },
  // 数组节点的处理函数
  visitArray(arr) {
    console.log("Visiting array:", arr);
  },
  // 其他节点的处理函数
  visitOther(node) {
    console.log("Visiting other node:", node);
  }
};

// 定义数据结构
const data = {
  name: "John",
  age: 30,
  address: {
    city: "New York",
    state: "NY"
  },
  hobbies: ["reading", "music"]
};

// 遍历数据结构并执行访问者对象中的处理函数
function traverse(data, visitor) {
  if (Array.isArray(data)) {
    visitor.visitArray(data);
    data.forEach(item => traverse(item, visitor));
  } else if (typeof data === "object") {
    visitor.visitObject(data);
    Object.values(data).forEach(item => traverse(item, visitor));
  } else {
    visitor.visitOther(data);
  }
}

traverse(data, visitor); // 输出数据结构中的每个节点

```

### 状态模式

对象在状态发生改变时改变其行为。和策略模式不同的是，状态和对应的行为是内部定义好的。可查看相关概念：有限状态机。

```js
const FSM = {
  off: {
    pressed: function () {
      console.log("黄灯");
      this.currState = FSM.yellow;
    },
  },

  yellow: {
    pressed: function () {
      console.log("白光");
      this.currState = FSM.white;
    },
  },

  white: {
    pressed: function () {
      console.log("关闭");
      this.currState = FSM.off;
    },
  },
};

class Light {
  constructor() {
    this.currState = FSM.off; // 设置当前状态
    this.button = null;
  }

  init() {
    self = this;
    this.button = document.getElementById("btn");
    this.button.onclick = function () {
      self.currState.pressed.call(self);
    };
  }
}

const light = new Light();
light.init();
```

### 迭代器模式

ES6中的 Iterator 就是迭代器，没啥好说的。



### 备忘录模式-了解

允许在不破坏对象封装的前提下，保存和恢复对象之前的状态。

说白了就是缓存对象实例，比如 keep-alive，用来优化性能。



### 责任链模式-了解

将请求沿着处理者链进行发送。 收到请求后， 每个处理者均可对请求进行处理， 或将其传递给链上的下个处理者。

```js
class Handler {
  constructor() {
    this.nextHandler = null;
  }

  setNext(handler) {
    this.nextHandler = handler;
    return handler;
  }

  handle(request) {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    return null;
  }
}

class LogHandler extends Handler {
  handle(request) {
    console.log(`Log: ${request}`);
    return super.handle(request);
  }
}

class ErrorHandler extends Handler {
  handle(request) {
    if (request === 'error') {
      console.error('An error has occurred');
      return null;
    }
    return super.handle(request);
  }
}

class ValidationHandler extends Handler {
  handle(request) {
    if (request.length < 5) {
      console.warn('The request is too short');
      return null;
    }
    return super.handle(request);
  }
}

const logHandler = new LogHandler();
const errorHandler = new ErrorHandler();
const validationHandler = new ValidationHandler();

logHandler.setNext(errorHandler).setNext(validationHandler);

logHandler.handle('valid request'); // Output: "Log: valid request"
logHandler.handle('error'); // Output: "Log: error" followed by an error message
logHandler.handle('short'); // Output: "Log: short" followed by a warning message
```

### 中介者模式-了解

中介者模式：

- 通过一个中介者对象来协调其他组件之间的交互。
- 各个组件不直接相互通信，而是通过中介者来进行间接沟通。

发布-订阅模式：

- 订阅者订阅消息，并在发布者发布该消息时收到通知。
- 发布者不需要知道谁是它的订阅者，也不需要关心订阅者的数量或身份。
- 可以有多个发布者和订阅者，它们之间是松散耦合的。

简而言之，中介者模式重点在于组件之间的通信协调，而发布订阅模式则侧重于事件的发布和订阅。 



### 模板方法模式-了解

封装行为中的不变部分，同时允许可变部分通过子类来进行扩展

```js
class Algorithm {
  // 模板方法
  templateMethod() {
    this.stepOne();
    this.stepTwo();
    this.stepThree();
  }
  stepOne() {
    throw new Error("Abstract method 'stepOne' must be implemented in subclass.");
  }
  stepTwo() {
    throw new Error("Abstract method 'stepTwo' must be implemented in subclass.");
  }
  stepThree() {
    throw new Error("Abstract method 'stepThree' must be implemented in subclass.");
  }
}

class ConcreteAlgorithm extends Algorithm {
  stepOne() {
    console.log('ConcreteAlgorithm: step one.');
  }
  stepTwo() {
    console.log('ConcreteAlgorithm: step two.');
  }
  stepThree() {
    console.log('ConcreteAlgorithm: step three.');
  }
}

const algorithm = new ConcreteAlgorithm();
algorithm.templateMethod();
```

### 命令模式-了解

将请求或简单操作转换为一个对象，此类转换让你能够延迟进行或远程执行请求，还可将其放入队列中。

编辑器中应该用得到：

```js
class OrderManager {
  constructor() {
    this.orders = [];
  }

  execute(command, ...args) {
    return command.execute(this.orders, ...args);
  }
}

class Command {
  constructor(execute) {
    this.execute = execute;
  }
}

function PlaceOrderCommand(order, id) {
  return new Command(orders => {
    orders.push(id);
    console.log(`You have successfully ordered ${order} (${id})`);
  });
}

function CancelOrderCommand(id) {
  return new Command(orders => {
    orders = orders.filter(order => order.id !== id);
    console.log(`You have canceled your order ${id}`);
  });
}

function TrackOrderCommand(id) {
  return new Command(() =>
    console.log(`Your order ${id} will arrive in 20 minutes.`)
  );
}

const manager = new OrderManager();

manager.execute(new PlaceOrderCommand("Pad Thai", "1234"));
manager.execute(new TrackOrderCommand("1234"));
manager.execute(new CancelOrderCommand("1234"));
```

### 解释器模式-了解

给定一个语言，定义它的文法的一种表示，并定义一个解释器。这个解释器使用该表示来解释语言中的句子。

和编译原理相关，可看 Vue源码的编译原理。



## 总览

只看**加粗**的即可，其他的了解即可

- 创建型（5）
  - 工厂方法模式 factory method
  - 抽象工厂模式 abstract factory
  - 单例模式 singleton
  - 原型模式 prototype
  - 生成器模式 builder
- 结构型（7）
  - 代理模式  proxy
  - 适配器模式 adapter
  - 装饰模式 decorator
  - 外观模式 facade
  - 享元模式 flyweight
  - 组合模式 composite
  - 桥接模式 bridge 
- 行为型（11）
  - 策略模式 strategy
  - 观察者模式 observer
  - 迭代器模式 iterator
  - 访问者模式 visitor
  - 状态模式 state
  - 备忘录模式 memeto
  - 模板方法模式 template method
  - 命令模式 command
  - 解释器模式 interpreter
  - 责任链模式 chain of responsibility
  - 中介者模式 mediator



## 参考资料

- https://refactoringguru.cn/design-patterns/catalog
- https://www.patterns.dev/posts
- JavaScript设计模式与开发实践
- [JavaScript 设计模式](https://www.w3cschool.cn/zobyhd/3lt2rcqm.html)
- https://fsharpforfunandprofit.com/fppatterns/
- [没用的设计模式](https://mp.weixin.qq.com/s/lUAwJRFWIsoEhSQiiPOYZw)