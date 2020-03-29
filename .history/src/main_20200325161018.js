/*
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-01-09 19:48:30
 * @LastEditors: lixiang
 * @LastEditTime: 2020-03-25 16:10:18
 */
import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import VCharts from 'v-charts'
import '@/styles/index.scss' // global css
import VDistpicker from 'v-distpicker'
import App from './App'
import router from './router'
import Router from 'vue-router'
import store from './store'

import '../theme/index.css'
import '@/icons' // icon
// import '@/permission' // permission control
import BaiduMap from 'vue-baidu-map';

Vue.component('v-distpicker', VDistpicker)
// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }

Vue.use(ElementUI, { locale })
Vue.use(VCharts)
Vue.use(BaiduMap, {
  /* Visit http://lbsyun.baidu.com/apiconsole/key for details about app key. */
  ak: 'v5BNP4Mvu6MBRQLhixebuYxGtP8ohl48'
})
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
