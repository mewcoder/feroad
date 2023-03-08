# 打印题

## ['1', '2', '3'].map(parseInt)

`[1, NaN, NaN]`

```jsx
["1", "2", "3"].map(parseInt); // [1, NaN, NaN]

const arr = ["1", "2", "3"];
const res = arr.map((s, index) => {
  return parseInt(s, index);
});

parseInt("1", 0); // 1 ，radix === 0 按 10 进制处理
parseInt("2", 1); // NaN ，radix === 1 非法（不在 2-36 之内）
parseInt("3", 2); // NaN ，2 进制中没有 3
```
