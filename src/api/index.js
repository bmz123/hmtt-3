// 提供一个配置好的axios，然后导出，在main.js来使用。
import axios from 'axios'
import store from '@/store'
import router from '@/router'
import JSONBIGINT from 'json-bigint'
// 1. 默认配置
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 配置头部的代码不能在这定义
// 这里的代码只会在刷新后只会执行一次
// axios.defaults.headers.Authorization = `Bearer ${store.getUser().token}`
// `transformResponse` 在传递给 then/catch 前，允许修改响应数据  而且在响应拦截器之前
axios.defaults.transformResponse = [(data) => {
  // 使用 json-bigint 进行转换
  // return JSONBIGINT.parse(data)
  // 当后端没有相应的时候，报错，捕获，处理方式：不去转换直接返回
  try {
    return JSONBIGINT.parse(data)
  } catch (e) {
    return data
  }
}]
// 2.请求拦截器
// axios.interceptors.requser.use(config => {
//   config.headers.Authorization = `Bearer ${store.getUser().token}`
//   return config
// }, err => Promise.reject(err))
// 2. 请求拦截器
axios.interceptors.request.use(config => {
  // 每次请求后台的时候，如果有token，需要请求头携带token。
  config.headers.Authorization = `Bearer ${store.getUser().token}`
  return config
}, err => Promise.reject(err))

// 3.响应拦截器
axios.interceptors.response.use(res => res, err => {
  // 根据当前的响应状态码是不是401去跳转登录页面
  // err 对象包含 错误的时候响应对象 err.response
  // 状态码  err.response.status 就是
  if (err.response && err.response.status === 401) {
    // 如果是vue组件中：this.$router.push('/login')  路由实例$router提供push函数
    // 如果在js模块中：导入创建好的实例对象调用push函数即可
    router.push('/login')
  }
  return Promise.reject(err)
})
export default axios
