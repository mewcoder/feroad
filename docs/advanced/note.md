# 模块联邦

- 模块联邦(module-federation)解决了什么问题？

如何解决应用间代码共享的问题?

- 使用 git-subtree 还是all-in-one，打包速度会慢，不够独立
- npm 发包，改动源码则需要构建-发布，所有依赖的项目都要更新一遍非常麻烦。

- 使用模块联邦，模块独立开发部署，依赖模块可以动态更新，相当于预构建，



- DLL 是将稳定的依赖打包提前编译，提高打包速度
- external 是为了替换公共的cdn库，减少打包体积，依赖关系需要手动管理

缺点：

- 不存在版本管理
- 去中心化后，如何管理和维护

- 工具链强绑定，如何通用起来，`hel-mirco`



- npm
- cdn 只是技术，不是方案
- monorepo  避免node_module 冗余，方便互相依赖
- git subtree/submodule

- 微前端：应用级别的拆分



> [一文通透讲解webpack5 module federation](https://juejin.cn/post/7048125682861703181)
>
> http://www.alloyteam.com/2020/04/14338/



微前端 

> [对比多种微前端方案](https://github.com/efoxTeam/emp/wiki/%E3%80%8A%E5%AF%B9%E6%AF%94%E5%A4%9A%E7%A7%8D%E5%BE%AE%E5%89%8D%E7%AB%AF%E6%96%B9%E6%A1%88%E3%80%8B)



- 技术栈无关性
- 代码隔离
- 通信