# Node

## 事件循环

Node 的事件循环是由 libuv 实现的，每一轮的事件循环有6个阶段，每个阶段都有一个FIFO的执行回调的队列。

关键阶段：**timers**: setTimout/setInterval 、**poll**: 执行回调 / 检查定时器 、 **check**:setImmediate 

- Node11调整与浏览器结果一致，每执行完一个  timers类任务 就执行微任务

  - 之前是：所有 timers 类任务 都执行完了，再执行微任务

- process.nextTick 是一个单独的队列，每个阶段执行完 都会执行 process.nextTick 的队列，优先级大于Promise

- setImmediate 和 setTimeout

  - 在 poll 处理的回调中 先 setImmediate 后 setTimeout ，否则（在主脚本）顺序是不确定的

    