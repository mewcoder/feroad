# TypeScript

## TypeScript 的优势

- TS 是 JS 的超级，支持 ESNext 新特性，引入了静态类型系统
- 可读性：代码可读性更高，IDE 提示
- 安全性：静态类型检查，增加代码健壮性可以减少错误，比如 undefined 等
- 可维护性：更利于维护和重构，利于协作
- 支持 ESNext 新特性，社区活跃

缺点：

- 有一定的学习成本，短期可能增加开发成本，代码量更多，而且需要编译，需要权衡

## interface 和 type

- interface 是一种数据结构的描述，比如对象；interface 可以多次定义并能够合并，可以被类实现
- type 是类型别名，是一种表达式；type 可以声明基本类型别名，联合类型，交叉类型、元组等类型，能进行类型编程
- 用 interface 描述数据结构，用 type 描述类型关系；能用 interface 实现，就用 interface , 如果不能就用 type

## infer

```typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
```

在 extends 后面的类型表达式中使用 infer 来声明一个类型变量占位符

## 协变和逆变

协变： 子类赋值给父类是安全的，因为子类上包含了父类所有的属性和方法；那么复合类型如何 Array、Promise 也遵循这种规则

```ts
let animal: Animal;
let dog: Dog;

animal = dog; // ✔

let animals: Array<Animal>;
let dogs: Array<Dog>;

animals = dogs; // ✔
```

逆变：作为函数参数时，处理父类的函数是可以赋值给处理子类的函数，因为传入的参数是子类，子类上包含了父类的所有属性和方法

```ts
let handleAnimal = (animal: Animal) => {};
let handleDog = (dog: Dog) => {};

handleAnimal = handleDog; // ❌
handleDog = handleAnimal; // ✔
```

双向协变：TS 类型系统允许函数参数是双向协变（bivariant），这意味着参数可以被看作是协变或逆变的，这是出于实用性考虑的一个妥协。

> 只有开启了--strictFunctionTypes 或者--strict 模式，ts 才对函数参数类型进行逆变检查。
>
> [为什么函数参数是双向协变的？](https://github.com/Microsoft/TypeScript/wiki/FAQ#why-are-function-parameters-bivariant)

## 参考

> [参考](https://juejin.cn/post/7236319311099297853)
