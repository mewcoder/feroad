# JavaSript 高级

## 箭头函数

- 箭头函数不会创建自己的 this，从上一层作用域继承 this
- call / apply / bind方法不能改变箭头函数中 this 的指向
- 没有 arguments
- 没有 prototype 不能 new
- 不能使用 yield命令，箭头函数不能用作 Generator 函数



## WeakSet/WeakMap

- WeakSet 的成员要求是对象，WeakMap 的键要求是对象。
- WeakSet 中的对象都是**弱引用**，如果 WeakSet 中的某个对象不可达（引用置为null）了，WeakSet 中的该对象会被回收掉。
- WeakMap 实例仅有has()、set()、get()、delete()操作方法，没有 size 属性以及keys()、values()、entries()方法，所以不能获取其所有键值，也就不能迭代。
- WeakSet/WeakMap 没有部署 Iterator接口，所以不能用 for...of 遍历。因为size取决于垃圾回收机制。
- 场景
  - WeakSet：保存 dom 节点
  - WeakMap： 给 dom 添加处理函数



## 垃圾回收机制

- 堆
- 引用计数法/标记清除法（可达性分析）
- 代价假说，新生代，老年代
- 单线程-全停顿 v8 做了一些优化，增量标记（利用浏览器空闲时间），惰性清理（写屏障），并发并行，目的是减少堆主线程的影响



## CJS和ESM模块化对比

- CJS 模块是运行时加载，ESM 是编译时输出接口
- CJS 模块输出的是值的拷贝，ESM 输出的是值的引用
- CJS 模块为同步加载，ESM 支持异步加载
- CJS 是单个值导出，ESM 可以导出多个
- CJS 模块的 this 是当前模块，ESM 的 this 是 undefined



## for循环问题

- var for里面定义的变量渗透到了外部
- let 块级作用域，每次循环重新声明一个变量



##  ['1', '2', '3'].map(parseInt)

  `[1, NaN, NaN]`

```jsx
['1', '2', '3'].map(parseInt) // [1, NaN, NaN]

const arr = ['1', '2', '3']
const res = arr.map((s, index) => {
    return parseInt(s, index)
})

parseInt('1', 0) // 1 ，radix === 0 按 10 进制处理
parseInt('2', 1) // NaN ，radix === 1 非法（不在 2-36 之内）
parseInt('3', 2) // NaN ，2 进制中没有 3
```

