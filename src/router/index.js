// 配置路由
import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login'
import store from '@/store'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import NotFound from '@/views/404'
import Article from '@/views/article'
import Image from '@/views/image'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    // 路由规则
    // // 登录
    // { path: '/login', component: Login }
    { path: '/login', component: Login },
    {
      path: '/',
      component: Home,
      children: [
        // 欢迎页面
        { path: '/', component: Welcome },
        // 内容管理
        { path: '/article', component: Article },
        // 素材管理
        { path: '/image', component: Image }
      ]
    },
    { path: '*', component: NotFound }
  ]
})

// 前置导航守卫
router.beforeEach((to, from, next) => {
  // to去哪里
  // from 来自哪里
  // next 放行|指定跳转路由
  // - 判断如果是除去登录页面外其他的路由且当前没有登录，拦截到登录。
  if (to.path !== '/login' && !store.getUser().token) return next('/login')
  // 其他情况都放行
  next()
})
export default router
