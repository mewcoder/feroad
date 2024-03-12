# 性能优化

## 1.从输入 URL 到页面显示发生了什么

以 performance timeline 为主线：

- redirect：避免不必要的重定向（301 永久/302 临时）
- cache：HTTP 缓存(强缓存/协商缓存)
- dns 查询
- tcp 握手：包括 ssl 握手，https，三握四挥

请求优化：TTFB(Time To First Byte)：首字节时间

- 避免重定向
- dns-prefetch/preconnect
- 使用 CDN，使用 HTTP2

渲染优化：CRP 关键渲染路径

- js 会阻塞 HTML 解析
- css 会阻塞渲染树的形成
- 怎么减少回流重绘



## 2.性能优化的手段

所谓性能优化，就是从用户请求到页面显示的整个生命周期上的优化。

大体过程分为：

- **网络请求部分**：查找缓存、DNS 解析、TCP 连接、HTTP 请求（会排队）和响应
- **浏览器渲染部分**：浏览器解析渲染

性能优化首先要有指标去评估,通过下面的手段去优化：

**网络请求优化：**

网络请求优化的目标：减少请求数量和耗时

1. 设置静态资源的 HTTP 缓存（强缓存/协商缓存）
2. `preload`（预先请求当前页面需要的资源）、 `prefetch`（将来页面中使用的资源，可能会浪费资源） 将数据缓存到 HTTP 缓存中
3. 使用 `dns-prefetch`，进行 DNS 预解析
4. 使用 `preconnect`，提前建立连接
5. 域名分片、HTTP2（同一个域名最多处理 6 个 TCP 连接，HTTP 请求会排队）
6. 采用 CDN 加速加快访问速度。(指派最近、高度可用)

**静态资源体积优化**：

- JS/CSS 的压缩，减少体积
- 图片:
  - 选择合适的格式：jpg/png/svg/webp/gif
  - 响应式图片 （img srcset /  picture source）
  - 小图使用 base64，减少请求，还有雪碧图（backgroud-positon）
  - 图片懒加载 



**渲染优化：**

> **渲染过程：**JavaScript 处理->计算样式->页面布局->绘制->合成

- JS 阻塞 DOM 解析，放在body底部(使用defer(DCL 之前) /async)；css放在head

- CSS 选择器减少层数，减少使用通配符。

- 减少重排和重绘，目标：减少直接操作 dom 的次数
  重排：几何属性、获取某些特定的属性值；
  
  重绘：修改样式
  
  - 合并对 DOM/样式 的操作：DocumentFragment
  - 脱离文档流
  - 图片定宽高
  - CSS3 的 GPU 加速（transform/opcity/filter/will-change）
  
- 使用事件委托

- 事件的防抖和节流

技术：

- 虚拟滚动
- 懒加载：使用`IntersectionObserver` 交叉观察器  

- 使用`webworker`处理长任务、时间切片 
- `requestAnimationFrame`  按帧执行，做动画
- `requestIdleCallback`  利用每帧的空余时机



## 3. Webpack 构建优化手段

体积优化：使用 webpack-bundle-analyzer 分析打包文件的体积和构成

- 代码压缩
- 剔除无用依赖， 如 moment
- 路由懒加载 import
- 分包
- externals 配合，cdn 引入

速度优化：使用 smp(speed-measure-webpack-plugin)  或 webpackbar 分析耗时
- 缩小构建范围：比如配置babel-loader 不解析 node_modules
- 减少文件搜索范围：配置路径别名 等
- 并行： thread-loader，terser-webpack-plugin 开启 parallel
- 利用原生语言框架，使用 esbuild-loader，提高转译速度
- 缓存：
  - terser-webpack-plugin 开启 cache
  - babel-loader 开启 cache
  - 使用 cache-loader ，耗时的 loader 之前使用
  - hard-source-webpack-plugin，构建缓存二次构建时间减少 80%



vue-cli4 默认配置已经添加了很多优化，包括：

- teser-webpack-plugin 代码压缩，且开启 parallel 和 cache 选项
- thread-loader 多线程： 为 babel-loader 开启了多线程
- cache-loader 缓存： 为 babel-loader 和 vue-loader 都开启了缓存
- eslint-loader：开启 cache 选项
- url-loader：小于 4K 的图片会转 base64
- mini-css-extract-plugin，提取css
- preload-webpack-plugin：入口加上preload，按需加载文件加上prefetch



## 4. Vue 有哪些优化手段

- Object.freeze() 常量
- v-if/v-show 切换频繁使用v-show
- v-for 使用唯一的 key
- 使用 computed
- keep-alive 缓存
- 路由懒加载
- 虚拟列表/懒加载

坑和最佳实践：

- 不要在同一个元素上使用 v-for 和 v-if

- 生命周期里解除对应的事件监听
- 响应式缺陷：新增属性，数组下标 `this.$set`
- `this.$forceUpdate()`：重新执行render函数
- 使用变化的key 使组件重新加载
- 使用`Object.assign(this.$data, this.$options.data())` 重置data
- watch中使用`immediate:true`，执行时机是在`created`之前，不用在`created`再执行

