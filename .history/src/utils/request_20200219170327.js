/*
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-01-09 19:48:30
 * @LastEditors  : lixiang
 * @LastEditTime : 2020-02-19 17:03:26
 */
import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

let self = this;
// 创建axios实例
const service = axios.create({
  baseURL: '/apis', // api的base_url
  // baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // 请求超时时间
})

service.defaults.baseURL = '/apis'
// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    // config.headers['Authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    // config.headers['token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    config.headers['token'] = store.getters.token // 让每个请求携带自定义token 请根据实际情况自行修改

  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
    * code为非200是抛错 可结合自己业务进行修改
    */
    const res = response.data
    if (res.code !== 200) {
      Message({
        message: res.msg + '：' + res.data,
        type: 'error',
        duration: 3 * 1000
      })
      if (res.data == "CodeMsg(code=500102, msg=用户不存在，请重新登录)"
        || res.data == "CodeMsg(code=500101, msg=无token，请重新登录") {
        store.dispatch('FedLogOut').then(() => {
          location.reload()// 为了重新实例化vue-router对象 避免bug
        })
        self.$router.push({ path: "/login" });
      }
      // 401:未登录;
      if (res.code === 401 || res.code === 403) {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
