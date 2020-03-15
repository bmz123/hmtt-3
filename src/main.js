import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/router'
// 简单使用axios
// import axios from 'axios'
import axios from '@/api'
// 注册全局组件
// import MyBread from '@/components/my-bread'
// Vue.component('my-bread', MyBread)
// 使用自己的插件
import plugin from '@/plugin'
Vue.use(plugin)
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
