### 前期准备工作

确定项目使用框架：

- UI框架：Ant React Pro(antd@4.0.3)
- JS框架：react
- 网络请求：axios
- 预处理语言：less
- 屏幕适配方案：百分比
- 路由插件：react-router-dom
- 全局状态管理：react-redux & redux
- 其他插件 (Eslint, Code Spell Check)

### 项目搭建

- 创建项目：create-react-app admin
- npm run eject 暴露webpack的配置文件
- 删除不必要的文件
- 添加开发日志文件devLog.md

### 项目架构

src目录下->: 

- pages: 存放页面组件
- components: 公有组件
- api: 统一接口api管理
- utils: 工具类
- router: 路由
- store： 全局状态管理
- static: 静态文件

### less预处理语言

- 安装：npm install less less-loader --save-dev

- 安装完之后还是不能用的，因为react脚手架默认配置的是sass依赖，需要我们手动在config目录下的webpack.config.js里配置less, 最简单的做法就是搜索sass, 把对sass的处理改为less的处理，比如文件匹配的正则改为less, 样式文件的loader改为less-loader

- 模块化：将样式写在xxx.module.less中，然后引用

  ```javascript
  import Style from './app.module.less'
  {/* app_box__lP-4H */}
  {/*<h1 className={Style.box}>后台管理系统</h1>*/}
  ```

### Ant Design Pro使用

- 安装： npm install antd

- 按需引入

  - 安装: npm install babel-plugin-import

  - 在webpack.config.js里配置。搜索babel-plugin，然后加配置项

    ```javascript
    ["import", {"libraryName": "antd", style: true}]
    ```

  - 不过这个时候还是不能使用antd, 因为在antd默认使用less2.7.3，而我们之前装的less不是这个版本，所以我们要把less版本回退到2.7.3

- 然后就可以在页面中引入组件了

### 页面路由

- 安装：npm install react-router-dom
- 