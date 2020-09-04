import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _8c9dc192 = () => interopDefault(import('../pages/login/index.vue' /* webpackChunkName: "pages/login/index" */))
const _dc7f1aaa = () => interopDefault(import('../pages/settings/index.vue' /* webpackChunkName: "pages/settings/index" */))
const _edaaf594 = () => interopDefault(import('../pages/article/components/article-comments.vue' /* webpackChunkName: "pages/article/components/article-comments" */))
const _48af31c7 = () => interopDefault(import('../pages/article/components/article-meta.vue' /* webpackChunkName: "pages/article/components/article-meta" */))
const _8c354308 = () => interopDefault(import('../pages/article/_slug.vue' /* webpackChunkName: "pages/article/_slug" */))
const _48935346 = () => interopDefault(import('../pages/editor/_id.vue' /* webpackChunkName: "pages/editor/_id" */))
const _e6fb0642 = () => interopDefault(import('../pages/profile/_id.vue' /* webpackChunkName: "pages/profile/_id" */))
const _320ae6c6 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _4586967a = () => interopDefault(import('../pages/login/index.vue' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/login",
    component: _8c9dc192,
    name: "login"
  }, {
    path: "/settings",
    component: _dc7f1aaa,
    name: "settings"
  }, {
    path: "/article/components/article-comments",
    component: _edaaf594,
    name: "article-components-article-comments"
  }, {
    path: "/article/components/article-meta",
    component: _48af31c7,
    name: "article-components-article-meta"
  }, {
    path: "/article/:slug?",
    component: _8c354308,
    name: "article-slug"
  }, {
    path: "/editor/:id?",
    component: _48935346,
    name: "editor-id"
  }, {
    path: "/profile/:id?",
    component: _e6fb0642,
    name: "profile-id"
  }, {
    path: "/",
    component: _320ae6c6,
    name: "index"
  }, {
    path: "/register",
    component: _4586967a,
    name: "register"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
