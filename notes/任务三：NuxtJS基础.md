# 任务三：NuxtJS基础

## Nuxt.js 是什么

- 一个基于 Vue.js 生态的第三方开源服务端渲染应用框架
- 它可以帮我们轻松的使用 Vue.js 技术栈构建同构应用
- 官网：[https://zh.nuxtjs.org/GitHub](https://zh.nuxtjs.org/GitHub)
- 仓库：[https://github.com/nuxt/nuxt.js](https://github.com/nuxt/nuxt.js)

同构渲染的应用

### Nuxt.js的使用方式

通常有三种使用方式：

- 初始项目
- 已有的 Node.js 服务端项目
    - 直接把 Nuxt 当作一个中间件集成到 Node Web Server 中
- 现有的 Vue.js 项目
    - 非常熟悉 Nuxt.js
    - 至少百分之 10 的代码改动

初始化 Nuxt.js 应用的方式

官方文档： [https://zh.nuxtjs.org/guide/installation](https://zh.nuxtjs.org/guide/installation)

方式一：使用 create-nuxt-app

方式二：手动创建

从头开始新建项目

```jsx
$ mkdir <项目名>
$ cd <项目名>
$ npm init -y

//package.json
"scripts": {
    "dev": "nuxt"
},

$ npm run dev

$ git init

.gitignore
node_modules
.nuxt

$ git status
$ git add .
$ git commit -m "Initialization"

$ git branch 02-router
$ git checkout 02-router
```

直接创建

网页：pages 文件：index.vue, about.vue 等

自动生成路由 router，基于 pages 文件下的目录。（在 .nuxt/router.js 中 可以查看）

### Nuxt.js 路由

Nuxt.js 路由 — 动态路由

Vue Router 动态路由匹配 （文件名为下划线 _ 开头）

[https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html](https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html)

Nuxt.js 动态路由

[https://zh.nuxtjs.org/guide/routing](https://zh.nuxtjs.org/guide/routing#%E5%8A%A8%E6%80%81%E8%B7%AF%E7%94%B1)

Nuxt.js 路由 — 嵌套路由

Vue Router 嵌套路由

[https://router.vuejs.org/zh/guide/essentials/nested-routes.html](https://router.vuejs.org/zh/guide/essentials/nested-routes.html)

Nuxt.js 嵌套路由

[https://zh.nuxtjs.org/guide/routing#动态路由](https://zh.nuxtjs.org/guide/routing#%E5%8A%A8%E6%80%81%E8%B7%AF%E7%94%B1)

Nuxt.js 路由 — 自定义路由配置

[https://zh.nuxtjs.org/api/configuration-router](https://zh.nuxtjs.org/api/configuration-router)

在项目根目录下创建 nuxt.config.js 

```jsx
module.exports = {
  router: {
    base: '/abc',
    // routes: 一个数组，路由配置表
    // resolve: 解析路由组件路径
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'hello',
        path: '/hello',
        component: resolve(__dirname, 'pages/about.vue')
      })
    }
  }
}
```

### Nuxt.js 视图

[https://zh.nuxtjs.org/guide/views](https://zh.nuxtjs.org/guide/views)

Nuxt.js 视图 — 模板

```jsx
// app.html
<!DOCTYPE html>
<html {{ HTML_ATTRS }}>
  <head {{ HEAD_ATTRS }}>
    {{ HEAD }}
  </head>
  <body {{ BODY_ATTRS }}>
    <!-- 渲染的内容最终会注入到这里 -->
    <h1>app.html</h1>
    {{ APP }}
  </body>
</html>
```

Nuxt.js 视图 — 布局

```jsx
// layouts/default.vue
<template>
  <div>
    <h1>layouts/default.vue 组件</h1>
    <!-- 页面出口，类似子路由出口 -->
    <nuxt />
  </div>
</template>

<script>
export default {
  name: 'LayoutDefault'
}
</script>

<style>
</style>

// layouts/fooDefault.vue
<template>
  <div>
    <h1>layouts/FooDefault.vue 组件</h1>
    <!-- 页面出口，类似子路由出口 -->
    <nuxt />
  </div>
</template>

<script>
export default {
  name: 'LayoutFooDefault'
}
</script>

<style>
</style>

// pages/index.vue
<script>
export default {
  name: 'HomePage',
  layout: 'fooDefault',
  // layout: 'default'
}
</script>
```

### Nuxt.js 异步数据 — asyncData 方法

[https://zh.nuxtjs.org/guide/async-data](https://zh.nuxtjs.org/guide/async-data)

基本用法：

它会将 asyncData 返回的数据融合组件 data 方法返回数据一并给组件

调用时机：服务端渲染期间和客户端路由更新之前

注意事项：

只能在页面组件中使用

没有 this，因为它是在组件初始化之前被调用的

```jsx
// static/data.json
// 可以访问 localhost:3000/data.json

$ npm i axios

// pages/index.vue
<template>
  <div>
    <h1>Hello Nuxt.js</h1>
    <nuxt-link to="/about">About</nuxt-link>
    <br>
    <Foo :posts="posts" />
  </div>
</template>

<script>
import axios from 'axios'
import Foo from '@/components/Foo'

export default {
  name: 'HomePage',
  // 当想要动态页面内容有利于 SEO 或提升首屏渲染速度的时候，就再 asyncData 中发请求拿数据
  async asyncData () {
    console.log('asyncData')
    console.log(this)   // 没有 this
    const res = await axios ({
      method: 'GET',
      url: 'http://localhost:3000/data.json'
    })
    return res.data
  },
  
  // 如果是非异步数据或者普通数据，则正常初始化到 data 中即可
  data () {
    return {
      foo: 'bar'
    }
  },
  components: {
    Foo
  }
}
</script>

<style>

</style>
```

### Nuxt.js 异步数据 — 上下文对象

```jsx
// pages/article/_id.vue
<template>
  <div>
    <h1>{{ article.title }}</h1>
    <p>{{ article.body }}</p>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  name: 'ArticlePage',
  async asyncData (context) {
    const { data } = await Axios({
      method: 'GET',
      url: 'http://localhost:3000/data.json'
    })
    // console.log(this.$route.params)  // 不能用
    const id = Number.parseInt(context.params.id)

    return {
      article:  data.posts.find(item => item.id === id)
    }
  }
}
</script>

<style>

</style>
```