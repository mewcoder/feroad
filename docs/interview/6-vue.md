# Vue

> 以Vue3为开头，引出下面的话题

## 1.说一下 Vue3 新特性

1. **API 方面**：

- Composition API  更好的逻辑组织和逻辑复用
- Teleport 传送⻔、Fragments ⽚段、SFC的CSS变量、Suspense等
- 自定义渲染器等

2. **性能方面**：

- 速度

  - 基于 Proxy 的响应式系统

  - 编译优化：静态标记、静态提升等

  - diff 算法优化

- 体积：引入 Tree-shaking

3. **维护性**：

- TypeScript：更好的类型检查和类型推导，也省去了维护 d.ts 的麻烦

- Monorepo：响应式库可以单独使用

> 引申：
>
> - Composition API
> - Proxy响应式
> - Diff
> - Tree-shaking
> - Monorepo

## 2. 说一下 Composition API 的优势

和 Options API 对比，分两个方面

- 代码组织：Options API 代码长了要跳来跳去
- 逻辑复用：mixins 来源不明 命名冲突 

还有就是函数式的优势

- 更简洁清晰：没有了 this 的指向不明的问题
- 函数更好的类型推断 ：vue2 使用TS `vue-class-component` 提供的 Class API，依赖装饰器的提案不稳定



Composition API 包括：

- 响应式相关（ref、reactive、computed、watch 等）
- 生命周期钩子（onMounted 和 onUnmounted 等）
- provide、inject 等



与React Hooks 对比：

- 灵感来源
- React Hooks 组件更新时都会重新调用，而 Vue 是基于响应式系统的
  - 只执行一次，会自动收集依赖，可避免不必要的更新



## 3. vue 响应式理解⭐

- 概念：追踪**对象属性**的读写，就等在 get 的时候进行依赖收集，set 的时候做出响应。
- Vue2 中 对象使用`Object.defineProperty` 对属性进行劫持，多层对象是**递归**实现劫持的；数组是通过重写数据的 7 个原型方法。
- **缺点**：
  - 对象无法监听到新增和删除属性，需要使 `$set`/`$delete`；
  - 数组无法监听索引（出于性能考虑）和长度变化；
  - 嵌套对象需要深层监听，性能问题
  - 不支持`Map`/`Set`

- Vue3 使用 `Proxy` 对对象进行代理，是对整个对象进行监听，拦截 set/get 行为，解决 Vue2 的问题，性能更好，不兼容IE

```js
function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      track(target, key)// 收集依赖
      return target[key]
    },
    set(target, key, value) {
      target[key] = value
      trigger(target, key)// 触发响应
    }
  })
}

// todo 完善版本
```

Proxy的优势：

- 监听整个对象即可，不需要遍历监听每个属性
- 更方便的监听数据



**设计模式：观察者模式**

> 为什么不是发布订阅模式，观察者和被观察者是存在直接关联的(观察者是Watcher实例)，发布订阅是有中心的，Vue中的事件绑定机制是发布订阅模式 `$on/$emit`



**细节**

Vue2 中，每个属性都有自己的`Dep`实例，`subs` 存放它所依赖的`watcher`，属性`set`后通知对应的 `watcher`去更新`dep.notify`

- 渲染watcher：视图初始化时，`render`函数运行，触发属性的`get`，收集依赖`dep.depend`
- 自定义watcher
- 计算watcher

> [为什么Watcher 要收集 Dep 实例](https://juejin.cn/post/6995079895470571551)

- 渲染watcher：重新渲染，方便清除无用的依赖` dep.removeSub(this)`
- 自定义watcher：`vm.$watch` 返回一个取消观察函数，目的同上
- 计算watcher：计算watcher不仅要收集自己的依赖，还要让自己依赖的值收集渲染watcher，才可以让视图响应更新



## 4. 虚拟DOM和Diff

**虚拟DOM**:

- 虚拟DOM 就是用 JS 对象来描述真实的DOM，是一种抽象
- 直接操作 DOM 是有限制，如diff/clone，通过 JS 操作对象更方便；频繁的操作dom会引发重排和重绘，通过patch方法（diff）渲染的页面，可以减少dom 直接操作的次数。
- 实现跨平台，通过 vdom 可以渲染到不同的平台。



**diff算法**：

- 首先 dom diff 是同层比较，不考虑跨层的情况
- 先比较是否是相同节点 key tag，相同节点比较属性,并复用老节点，然后比较儿子节点：
- Vue2 是双端比较，两个列表的头尾相互比较，对比的过程中逐渐向内靠拢，直到某一个列表遍历完成。
- Vu3 是头和头比，尾和尾比，剩余的基于最长递增子序列进行增/删/移



**key的作用**

key的作用是为了更高效的更新DOM，diff 算法的目标就是尽可能复用原来对应的节点，减少dom操作量。

key 就是 vnode 的唯一 id，在dom diff 的过程中，通过key 找到对应原型的节点，来减少dom操作量，提升视图更新的性能。

- 若不设置 key，就是 undefined，diff算法会认为是相同节点，会就地复用元素，会增加dom操作量，而且在元素有状态的情况下会造成渲染错误（隐蔽性bug）。
- 使用数组 index 作为 key，如果列表的顺序会发生变化，和不写 key 区别不大。



## 5. 模板编译原理

Vue2的过程是 parse -> optimize -> genarate

optimize：优化原始 AST，标记静态节点。



Vue3 更加标准化，中间过程为 transform

1. parse：compilter 会对 template 进行解析，得到抽象语法树AST，
2. transform：遍历 AST 进行 转换
3. generate： 生成render函数，render函数是返回虚拟DOM的函数



vue3的编译优化：编译阶段尽可能提取关键信息

- patchFlag 对节点打上标记，为 runtime patch 提供依据，实现静态提升和靶向更新。
- 静态提升： 将纯静态节点提升到渲染函数外部，在渲染函数内部保持对静态节点的引用即可
- Block：dynamicChildren 收集子代所有的动态节点，无需层级遍历，做到靶向更新。
  - Block Tree:  为了解决如v -if v-for 导致的DOM结构不稳定问题
- 缓存模板中的内联事件处理函数，避免函数重新创建

https://zhuanlan.zhihu.com/p/150732926





## nextTick

- Vue 是异步更新策略，数据变化，vue不会立即更新 dom，是开启一个队列，同一个事件循环里发生的变化会异步的批量更新。如果同一个 watcher 被多次触发，避免频繁的DOM更新。
- 要获取到更新后的 DOM，需要使用 `nextTick`，用户传入的回调函数被添加到刷新函数(`flushSchedulerQueue`)的后面
- 降级处理 微任务（promise->MutationObserver）->宏任务（setImmediate->setTimeout ）

> 微任务（当前宏任务还没结束）为什么能获取更新后的dom，这里的dom更新结果是在内存中也能获取到，虽然浏览器可能还没渲染出来（宏任务每轮结束完也不一定会伴随着页面更新渲染）。





## MVVM概念

1. Model模型层、View视图层、ViewModel 视图模型层，用来连接 Model 和 View
2. **数据驱动视图，视图响应改变数据**。
3. Vue 可以看作是 MVVM 框架，Vue 实例的变量名用的是 vm (ViewModel 的缩写) ；但没有完全遵循 MVVM 模型，Vue 中可以通过 `$ref`直接去操作视图，这一点上违背了 MVVM。



## 双向绑定 

- 解释：

1. vue 中双向绑定使用指令 `v-model`，可以绑定数据到视图，对应的视图变化也会改变该数据。
2. `v-model` 是语法糖，默认情况下相当于`:value`和`@input`。v-model 经过**模板编译**被转换为属性 `value`  和一个事件监听，事件回调函数中会做相应变量更新操作。

- 使用

1. 通常在原生表单项上使⽤ `v-model` ，也可以在自定义组件上使用
2. `v-model` 只能去绑定一个变量，使用 `.sync` 可以实现多个变量的双向绑定 
3. Vue3 的 `v-model` 有更新，类似`.sync`，默认的 `v-model` 相当于`:modelValue`和`@update:modelValue`

- 优点

1. 使用 `v-model` 可以减少事件回调函数代码，方便绑定和更新数据

```jsx
<!-- 使用.sync -->
<ChildComponent :title.sync="pageTitle" />
<!-- 是以下的简写: -->
<ChildComponent :title="pageTitle" @update:title="pageTitle = $event" />
 // 子组件触发更新
this.$emit('update:title', newValue)
```

```JSX
<ChildComponent v-model="pageTitle" />
<!-- 是以下的简写: -->
<ChildComponent
  :modelValue="pageTitle"
  @update:modelValue="pageTitle = $event"
/>
  
<!-- 指定prop: -->
<ChildComponent v-model:title="pageTitle" />
<!-- 是以下的简写: -->
<ChildComponent :title="pageTitle" @update:title="pageTitle = $event" />
```

> Vue中的单向数据流是指数据的流向只能从父组件向子组件，子组件不能直接修改父组件中的数据，而是通过触发父组件中的事件来实现数据的修改



- 



## 组件通信方式

- 父子组件 props /$emit- ~~$on~~/ $ref / $parent - $~~children~~/ $refs / $attrs ~~$listeners~~
- 兄弟组件 $parent / $root / eventbus / vuex
- 跨层级关系 provide + inject / eventbus / vuex

> $on 实现原理是发布订阅模式，vue3没法直接用on/emit 实现eventbus，可以使用 mitt 或 tiny-emitter 插件



## Vue 生命周期

- 生命周期钩子就是回调函数而已，当创建组件实例的过程中会调用对应的钩子，钩子函数维护成数组的形式。
- 分为组件的
  - 创建前后（beforeCreate/created）
  - 挂载前后（beforeMount/mounted）
  - 更新前后（beforeUpdate/updated）
  - 销毁前后（beforeDestory/destroyed    Vue3: beforeUmounted/unmounted）
- keep-alive激活时（activated/deactivated）
- 捕获后代组件错误（errorCaptued）
- 父子组件，创建是自上而下，挂载是自下而上。

> setup位于 beforeCreate 和 created 之间



## v-if 和 v-for

-  实践中不应该把 v-for 和 v-if 放⼀起
-  Vue2 中 for 比 if 的优先级高，如果放在一起使用，会遍历整个列表逐个判断；推荐使用 computed 计算属性；
-  Vue3 中 if 比 for 的优先级高。



## v-if 和 v-show

- v-if 如果条件不成立则不会渲染当前指令所在节点的 dom 元素
- v-show 是改变的元素的`display:none`
- 频繁切换的就用 v-show



## computed和watch

- computed 依赖响应式的数据产生新数据，具有缓存性，只有依赖的响应式数据变化时才会重新求值。
- watch 用来监听某个响应式数据的变化并执行对应的回调函数，是命令式的。



## 组件扩展方法

- mixins

```javascript
// 全局混⼊：将混⼊对象传⼊
Vue.mixin(mymixin)

// 局部混⼊：做数组项设置到mixins选项，仅作⽤于当前组件
const Comp = {
  mixins: [mymixin]
}
```

- slot  默认插槽/具名插槽/作用域插槽
- extends	(组件的继承，类似于mixins)
  - 创建一个“Vue子类”，参数是一个包含组件选项的对象。在实际业务开发中我们很少使用，但是在一些独立组件开发场景中，例如要实现一个类似于提示组件，可以像调用函数使用它，传参和挂载
- 合并策略： 
  - 同名钩子函数合到一个数组，混入的在前面
  - 为对象的选项，**冲突以当前组件的为准**
- 混入的数据和方法不好判断来源而且容易冲突，composition-api 利用独立的响应式模块方便使用响应式数据和编写独立的逻辑，更有利于逻辑抽离，方便可读性和可维护性。



## 组件data为什么必须是个函数？

组件可能被多次实例化，调用 data 函数返回一个对象作为组件的数据源，这样可以保证**相同组件 不同实例 **间数据互不影响。



## slot实现原理

- 分为普通插槽和作用域插槽
- 作用域插槽的就是让插槽内容能够访问子组件中的数据
- 父组件把插槽编译成返回 vnode的函数，子组件渲染时，调用执行

[https://zhuanlan.zhihu.com/p/126286014](https://zhuanlan.zhihu.com/p/126286014)



## keep-alive⭐

- 开发中缓存组件使⽤keep-alive组件，keep-alive是vue内置组件，keep-alive包裹动态组件component时，会缓存不活动的组件实例，⽽不是销毁它们，这样在组件切换过程中将状态保留在内存中，防⽌重复渲染。

-  结合属性include和exclude可以明确指定缓存哪些组件或排除缓存指定组件，集合vue-router缓存页面

- activated 和 deactivated 钩子

-  keep-alive是⼀个通⽤组件，它内部定义了⼀个map，缓存创建过的组件实例，它返回的渲染函数内部会查找

  内嵌的component组件对应组件的vnode，如果该组件在map中存在就直接返回它。由于component的is属

  性是个响应式数据，因此只要它变化，keep-alive的render函数就会重新执⾏。

