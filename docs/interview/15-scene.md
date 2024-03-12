# 场景题

## 前端怎么解决高并发问题

前端能做的：

- 静态资源通过 CDN、并对静态资源进行合并和压缩
- 前端缓存（强缓存和浏览器存储），避免重复请求
- 异步加载和懒加载（图片和数据）
- 减少重复请求，防抖节流等；限制某些接口的请求频率
- 接口优化，合并请求和压缩数据

服务端：接口优化、负载均衡、热点数据缓存、数据库查询优化、集群扩容

## b 端项目大数据量性能优化

- 数据分片
- 虚拟滚动

图表数据卡顿

- 使用增量渲染代替全量渲染
- 图表过多懒加载
- 折线图 LTTB 降采样

https://juejin.cn/post/7280007832701927443
https://juejin.cn/post/7145488193314357255