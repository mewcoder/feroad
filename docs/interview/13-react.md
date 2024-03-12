# React

## React 版本差异

- 16.3：fiber
- 16.8：hooks
- 17：过渡版本
- 18：concurrent mode

## setState 是同步还是异步

- 所谓同步异步是指调用 setState 之后状态是否立即发生改变，比如调用之后读取到的 state 是不是最新的。

- react18 之前（半自动批处理）：：setState 只在合成事件和钩子函数中是异步的，在原生事件和 setTimeout 中都是同步的。
- React18（自动批处理）：是异步的

> 注意 vue 数据是可变的， nextTick() 是为了等待 DOM 更新，

## hooks 的使用限制

只能在函数组件中使用，不要在 React 的循环、条件或嵌套函数中使用；

React 中每个组件都有一个对应的 FiberNode，其实就是一个对象，这个对象是有个属性叫 memoizedState。当组件是函数组件的时候，fiber.memoizedState 上存储的就是 Hooks 单链表。

单链表的每个 hook 节点没有名字或者 key，因为除了它们的顺序，我们无法记录它们的唯一性。因此为了确保某个 Hook 是它本身，我们不能破坏这个链表的稳定性。
保证 Hook 调用的顺序在每次渲染时都是相同的：

## fiber 和并发

可中断
