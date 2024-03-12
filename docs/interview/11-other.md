# 其他

## 讲一下微前端方案？

微前端的核心价值：

- 独立开发和部署
- 技术栈无关
- 微应用之间隔离

微前端框架解决的问题：

- 目标：像 iframe 一样接入简单和隔离
- 通信方便和路由同步

- iframe

  - 优点：原生隔离方案，简单；不考虑体验，完美
  - 缺点：
    - 加载慢，白屏时间长
    - url 不同步，刷新丢失
    - 通信不方便 postMessage

- qiankun
  - 优点：共享数据和状态方便，支持预加载
  - 缺点:
    - 有改造成本，主应用和子应用都要配置
    - 父子公用路由
- single-mpa

- EMP

- [无界](https://wujie-micro.github.io/doc/)

  - 优点：

    - js 隔离使用 iframe，html+css 使用 web components
    - 子应用无需改造

  - 缺点：web components 兼容性

JS 隔离：

- Proxy 代理：创建一个 proxy 来代理 window
- 快照沙箱：对 window 属性进行快照

样式隔离：

- CSS-Modules

- 真正的隔离 Shadow DOM

## 方案的落地，以微前端举例：

微前端不止拆的代码和工程，而是业务，需要划分业务和确定边界。

- 1.验证原型 验证技术方案可行性
- 2.成本/收益评估
- 3.迭代计划
- 4.事故预案 盘点风险，做好预案

聊一聊你对模块联邦的看法

## WebAssembly(WASM)

WASM 是一种新的二进制格式，可以直接在浏览器中运行；可以将 C/C++、Rust 等语言编译成 WASM，可以让浏览器直接运行。
一些应用：

- monaco-editor
- WebContainer(stackblitz)
- 视频播放器插件
