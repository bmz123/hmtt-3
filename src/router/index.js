// 配置路由
import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
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
        { path: '/', component: Welcome }
      ]
    }
  ]
})
export default router
