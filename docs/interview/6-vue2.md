# Vue全家桶和应用

## 怎么实现路由懒加载

当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效。

```js
const router = createRouter({
  // ...
  routes: [{ path: '/users/:id', component: () => import('./views/UserDetails.vue') }],
})
```

动态导入的路由组件，webpack会进行代码分割



## 如何实现一个路由

一个SPA应用的路由需要解决的问题是**页面跳转内容改变同时不刷新**，同时路由还需要以插件形式存在，所以：

1. router实例化的时候保存用户传入的配置项和路由表，运行时要
   - 监听 hash或者 popstate 事件
   - 回调里根据 path 匹配对应路由
2. 将router定义成一个Vue插件，即实现install方法，内部做两件事：
   - 实现两个全局组件：router-link和router-view，分别实现页面跳转和内容显示
   - 定义两个全局变量：$route和$router，组件内可以访问当前路由和路由器实例



## Vue-Loader是什么

1. `vue-loader`是用于处理单文件组件（SFC，Single-File Component）的 webpack loader
2. 因为有了`vue-loader`，我们就可以在项目中编写SFC格式的Vue组件，我们可以把代码分割为、`<script>`和`<style>`，代码会异常清晰。结合其他loader我们可以用SASS编写`<style>`，用TS编写`<script>`。
3. webpack 打包时，会以 loader 的方式调用 vue-loader
4. vue-loader 被执行时，它会对 SFC 中的每个语言块用单独的 loader 链处理。最后将这些单独的块装配成最终的组件模块。
5. 支持scoped CSS，热重载 



原理：

- `vue-loader`会调用`@vue/compiler-sfc`模块解析SFC源码为一个描述符（Descriptor），然后为每个语言块生成import代码。

```js
  import script from 'babel-loader!vue-loader!source.vue?vue&type=script'
  
  import 'style-loader!vue-loader/style-post-loader!css-loader!sass-loader!vue-loader!source.vue?vue&type=style&index=1&scoped&lang=scss'
```

- 将 template 部分编译成 render 函数    
  





> https://www.processon.com/view/link/620c4de01efad406e72b891f#outline