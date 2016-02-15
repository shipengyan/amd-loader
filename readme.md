AMD Loader
----------


# 规范

- AMD [https://github.com/amdjs/amdjs-api](https://github.com/amdjs/amdjs-api)

# 原理

- 配置参数
- 定义模块`define`,加载模块`require`
- 解析URL，通过`<script>`加载`JS`文件，解决依赖模块
- 如果有依赖模块解决了，应该立即执行`factory`