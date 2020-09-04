# 任务四：NuxtJS综合案例

## 案例介绍

案例名称：RealWorld

一个开源的学习项目，目的就是帮助开发者快速学习新技能

Github 仓库：[https://github.com/gothinkster/realworld](https://github.com/gothinkster/realworld)

在线示例：[https://demo.realworld.io/#/](https://demo.realworld.io/#/)

页面模板：

[https://github.com/gothinkster/realworld-starter-kit/blob/master/FRONTEND_INSTRUCTIONS.md](https://github.com/gothinkster/realworld-starter-kit/blob/master/FRONTEND_INSTRUCTIONS.md)

接口文档：

[https://github.com/gothinkster/realworld/tree/master/api](https://github.com/gothinkster/realworld/tree/master/api)

学习前提：

Vue.js 使用经验

Nuxt.js 基础

Node.js，webpack 相关使用经验

学习收获：

掌握使用 Nuxt.js 开发同构渲染应用

增强 Vue.js 实践能力

掌握同构渲染应用中常见的功能处理

用户状态管理

页面访问权限处理

SEO 优化

。。。

掌握同构渲染应用的发布与部署

## 项目初始化

### 创建项目

```jsx
$ mkdir realworld-nuxtjs
$ npm init -y
$ npm i nuxt

// 配置启动脚本

// 创建 pages 目录，配置初始页面
```

vue.js 普遍模板

```jsx
<template>
    <div>
        <h1>Home Page</h1>
    </div>
</template>

<script>
export default {
    name: 'HomePage',
    components:  {},
    props: {},
    data () {
        return {}
    },
    computed: {},
    watch: {},
    created () {},
    mounted () {},
    methods: {}
}
</script>

<style>

</style>
```

### 导入页面模板

- 导入样式资源
    - app.html
    - 一个很好的 CDN 平台：[https://www.jsdelivr.com/](https://www.jsdelivr.com/)
- 配置布局组件
- 配置页面组件

处理导航链接高亮

linkActiveClass

[https://zh.nuxtjs.org/guides/configuration-glossary/configuration-router/#linkactiveclass](https://zh.nuxtjs.org/guides/configuration-glossary/configuration-router/#linkactiveclass)

```jsx
// nuxt.config.js
	router: {
    linkActiveClass: 'active',
		extendRoutes(routes, resolve) {
		...
		}
	}

// 加入精确匹配给 Home
<nuxt-link class="nav-link" to="/" exact>Home</nuxt-link>
```

### 封装请求模块

```jsx
$ npm i axios

// utils/request.js

/**
 * 基于 axios 封装的请求模块
 */
import axios from 'axios'

const request = axios.create({
    baseURL: 'https://conduit.productionready.io'
})

// 请求拦截器

// 相应拦截器

export default request
```

## 登录注册

### 解析存储登录状态实现流程

JWT (jsonwebtoken) 进行身份验证

### 处理页面访问权限

middleware

[https://zh.nuxtjs.org/guide/routing#中间件](https://zh.nuxtjs.org/guide/routing#%E4%B8%AD%E9%97%B4%E4%BB%B6)

## 首页

## 发布部署

```jsx
// access AWS EC2
$ chmod 400 aws-ec2-nuxtjs.pem
$ chmod 400 realworld-nuxt.zip

$ ssh -i aws-ec2-nuxtjs.pem ec2-user@ec2-52-53-152-229.us-west-1.compute.amazonaws.com

$ scp -i aws-ec2-nuxtjs.pem realworld-nuxt.zip ec2-user@ec2-52-53-152-229.us-west-1.compute.amazonaws.com:/home/ec2-user/realworld-nuxtjs

$ unzip realworld-nuxt.zip

$ npm i
$ npm run start

$ pm install pm2@latest -g

// $ pm2 start app.js
$ pm2 start npm -- start

// turn off
$ pm2 stop id
```

[https://medium.com/@balghazi/deploying-react-node-js-application-to-amazon-ec2-instance-a89140ab6aab](https://medium.com/@balghazi/deploying-react-node-js-application-to-amazon-ec2-instance-a89140ab6aab)