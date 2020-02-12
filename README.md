# serveless-egg-ssr-boilerplate

基于 Serverless + Egg + React + Webpack 服务端渲染 SSR (Server Side Render) 工程
骨架项目。**项目克隆自 [egg-react-webpack-boilerplate](https://github.com/easy-team/egg-react-webpack-boilerplate)，并针对 `serverless` 架构做了适配处理。**

- 线上访问: http://49.233.172.37:7001
- 文档请见:
  [Egg + React 工程解决方案](https://www.yuque.com/easy-team/egg-react)

## 特性

> 注意：当前对 `asyncData` 前端获取数据支持不友好，不建议使用。

- 基于 React 多页面/单页面服务端渲染

- 支持服务端渲染失败时, 自动降级为前端渲染模式; 支持 react-loadable 异步组件渲染

- 数据层面进行了简单设计，支持 FileDB，MySQL，Mongo 接口

- 支持 Node 和 前端代码修改 Webpack 时时编译和热更新

- 支持服务端渲染 `render` 和纯前端渲染 `renderClient`

- 支持自动根据 jsx 文件构建 Webpack entry 入口文件

- 支持 css, sass, scss, less, stylus

- 支持 css module , 且同时支持 css 和 css module 共存的情况

- 支持 react-router, react-redux 服务端渲染(SSR)和前端渲染(CSR)

- 支持 Webpack dll 自动化构建, 与多进程编译结合，构建速度减少 2/3

- Node 8 版本的 async 和 await 特性, Controller 采用 class 方式编写

## 依赖

- [easywebpack](https://github.com/easy-team/easywebpack) ^4.x.x
- [easywebpack-react](https://github.com/easy-team/easywebpack-react) ^4.x.x
- [egg-view-react-ssr](https://github.com/easy-team/egg-view-react-ssr) ^2.1.0
- [egg-webpack](https://github.com/easy-team/egg-webpack) ^4.x.x
- [egg-webpack-react](https://github.com/easy-team/egg-webpack-react) ^2.0.0

![工程化](http://hubcarl.github.io/img/webpack/egg-webpack-react-ssr.png)

## 使用

#### 安装 cli

```bash
npm install @easy-team/easywebpack-cli -g
```

#### 安装依赖

```bash
npm install
```

#### 本地开发

> 启动流程: https://www.yuque.com/easy-team/egg-react/build

```bash
npm run dev
```

应用访问: http://127.0.0.1:7001

- 本地开发启动 Webpack 构建, 默认配置文件为项目根目录 `webpack.config.js` 文件。
  SSR 需要配置两份 Webpack 配置，所以构建会同时启动两个 Webpack 构建服务。web 表
  示构建 JSBundle 给前端用，构建后文件目录 `public`, 默认端口 9000; node 表示构
  建 JSBundle 给前端用，构建后文件目录 `app/view`, 默认端口 9001.

- 本地构建是 Webpack 内存构建，文件不落地磁盘，所以 `app/view` 和 `public` 在本
  地开发时，是看不到文件的。 只有发布模式(npm run build)才能在这两个目录中看到构
  建后的内容。

### 配置说明

> https://www.yuque.com/easy-team/egg-react/config

```js
`config/config.local.js`;
const easywebpack = require('@easy-team/easywebpack-react');
exports.webpack = {
  webpackConfigList: easywebpack.getWebpackConfig(),
};
```

#### 项目构建

```bash
// 直接运行(编译文件全部在内存里面,本地开发使用)
npm start

// 编译文件到磁盘打包使用(发布正式环境)
npm run build 或者 easy build
```

## 项目结构和基本规范

    ├── app
    │   ├── controller
    │   │   ├── test
    │   │   │   └── test.js
    │   ├── extend
    │   ├── lib
    │   ├── middleware
    │   ├── mocks
    │   ├── proxy
    │   ├── router.js
    │   ├── view
    │   │   ├── about                         // 服务器编译的jsbundle文件
    │   │   │   └── about.js
    │   │   ├── home
    │   │   │     └── home.js                 // 服务器编译的jsbundle文件
    │   │   └── layout.js                     // 编译的layout文件
    │   └── web                               // 前端工程目录
    │       ├── asset                         // 存放公共js,css资源
    │       ├── framework                     // 前端公共库和第三方库
    │       │   └── entry
    │       │       ├── loader.js              // 根据jsx文件自动生成entry入口文件loader
    │       ├── page                              // 前端页面和webpack构建目录, 也就是webpack打包配置entryDir
    │       │   ├── home                          // 每个页面遵循目录名, js文件名, scss文件名, jsx文件名相同
    │       │   │   ├── home.scss
    │       │   │   ├── home.jsx
    │       │   └── hello                          // 每个页面遵循目录名, js文件名, scss文件名, jsx文件名相同
    │       │       ├── test.css                   // 服务器render渲染时, 传入 render('test/test.js', data)
    │       │       └── test.jsx
    │       ├── store
    │       │   ├── app
    │       │   │   ├── actions.js
    │       │   │   ├── getters.js
    │       │   │   ├── index.js
    │       │   │   ├── mutation-type.js
    │       │   │   └── mutations.js
    │       │   └── store.js
    │       └── component                         // 公共业务组件, 比如loading, toast等, 遵循目录名, js文件名, scss文件名, jsx文件名相同
    │           ├── loading
    │           │   ├── loading.scss
    │           │   └── loading.jsx
    │           ├── test
    │           │   ├── test.jsx
    │           │   └── test.scss
    │           └── toast
    │               ├── toast.scss
    │               └── toast.jsx
    ├── config
    │   ├── config.default.js
    │   ├── config.local.js
    │   ├── config.prod.js
    │   ├── config.test.js
    │   └── plugin.js
    ├── doc
    ├── index.js
    ├── webpack.config.js                      // easywebpack-cli 构建配置
    ├── public                                 // webpack编译目录结构, render文件查找目录
    │   ├── static
    │   │   ├── css
    │   │   │   ├── home
    │   │   │   │   ├── home.07012d33.css
    │   │   │   └── test
    │   │   │       ├── test.4bbb32ce.css
    │   │   ├── img
    │   │   │   ├── change_top.4735c57.png
    │   │   │   └── intro.0e66266.png
    │   ├── test
    │   │   └── test.js
    │   └── vendor.js                         // 生成的公共打包库

## 功能实现

### 一.多页面服务器渲染同构实现

#### 1.编写 jsx 页面

在 app/web/page 目录下面创建 home 目录, home.jsx, home.css 文件.

- home.jsx 编写界面逻辑

```js
import React, { Component } from 'react';
import Header from 'component/layout/standard/header/header.jsx';
import List from 'component/home/list.jsx';
import './home.css';
export default class Home extends Component {
  componentDidMount() {
    console.log('----componentDidMount-----');
  }

  render() {
    return (
      <div>
        <Header></Header>
        <div className='main'>
          <div className='page-container page-component'>
            <List list={this.props.list}></List>
          </div>
        </div>
      </div>
    );
  }
}
```

#### 2.多页面后端实现

- 创建 controller 文件 home.js

```javascript
exports.index = function*(ctx) {
  yield ctx.render('home/home.js', Model.getPage(1, 10));
};
```

- 添加路由配置

```javascript
app.get('/home', app.controller.home.home.index);
```

### 3.前端渲染

- 创建 controller 的 home.js 添加如下代码

```javascript
exports.client = function*(ctx) {
  yield ctx.renderClient('home/home.js', Model.getPage(1, 10));
};
```

- 添加路由配置

```javascript
app.get('/client', app.controller.home.home.client);
```

## 部署到云函数

全局安装 `serverless`:

```bash
$ npm i serverless -g
```

### 新建 .env

```bash
$ cp .env.example .env
```

然后将 `.env` 中的配置参数修改为你自己的。

### 配置 yml

根据需求修改 `serverless.yml` 文件，具体参考
[tencent-egg](https://github.com/serverless-components/tencent-egg)

### 执行部署

```bash
$ npm run build
$ serverless --debug
```

## License

[MIT](LICENSE)
