## antd input style issue

antd@3.15.1 版本在使用 `babel-plugin-import` 按需加载后， `ant-input` class 的样式不会自动加载，导致日期选择组件此时会样式不对：

![](https://img.alicdn.com/tfs/TB1.eQ7MxYaK1RjSZFnXXa80pXa-2880-956.png)

对比正确的：

![](https://img.alicdn.com/tfs/TB1Fp.YMq6qK1RjSZFmXXX0PFXa-2880-1344.png)

