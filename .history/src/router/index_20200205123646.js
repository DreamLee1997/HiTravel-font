import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index/index'
import destination from '@/components/destination/destination'
import strategy from '@/components/strategy/strategy'
import shop from '@/components/shop/shop'
import hotel from '@/components/hotel/hotel'
import login from '@/components/login/login'
import register from '@/components/register/register'
import hotelBusiness from '@/components/hotelBusiness/hotelBusiness'
import scenicSpotBusiness from '@/components/scenicSpotBusiness/scenicSpotBusiness'


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
    {
      path: '/hotelBusiness',
      component: hotelBusiness,
      meta: {
        keepAlive: true   //true,页面不带navbar和footer
      }
    },
    {
      path: '/scenicSpotBusiness',
      component: scenicSpotBusiness,
      meta: {
        keepAlive: true   //true,页面不带navbar和footer
      }
    },
  ]
})
