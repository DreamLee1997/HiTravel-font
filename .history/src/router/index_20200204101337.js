/*
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-01-09 13:31:07
 * @LastEditors: lixiang
 * @LastEditTime: 2020-02-04 10:13:37
 */
import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index/index'
import destination from '@/components/destination/destination'
import strategy from '@/components/strategy/strategy'
import shop from '@/components/shop/shop'
import hotel from '@/components/hotel/hotel'
import login from '@/components/login/login'
import register from '@/components/register/register'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index',
    },
    {
      path: '/index',
      component: index
    },
    {
      path: '/login',
      component: login,
      meta: {                       
        keepAlive: true   //true,页面不带navbar和footer
      }
    },
    {
      path: '/register',
      component: register,
      meta: {
        keepAlive: true   
      }
    },
    {
      path: '/destination',
      component: destination
    },
    {
      path: '/strategy',
      component: strategy
    },
    {
      path: '/shop',
      component: shop
    },
    {
      path: '/hotel',
      component: hotel
    },
  ]
})
