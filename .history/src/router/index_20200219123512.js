/*
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-01-09 13:31:07
 * @LastEditors  : lixiang
 * @LastEditTime : 2020-02-19 12:35:12
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
import hotelBusiness from '@/components/hotelBusiness/hotelBusiness'
import scenicBusiness from '@/components/scenicBusiness/scenicBusiness'
import myHotel from '@/components/hotelBusiness/myHotel/myHotel'
import regHotel from '@/components/hotelBusiness/regHotel/regHotel'
import roomMgt from '@/components/hotelBusiness/roomMgt/roomMgt'
import myScenic from '@/components/scenicBusiness/myScenic/myScenic'
import regScenic from '@/components/scenicBusiness/regScenic/regScenic'
import ticketMgt from '@/components/scenicBusiness/ticketMgt/ticketMgt'
import writeStrategy from '@/components/strategy/writeStrategy/writeStrategy'
import myStrategy from '@/components/home/myStrategy/myStrategy'
import myFavorites from '@/components/home/myFavorites/myFavorites'
myFavorites

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
      path: '/writeStrategy',
      component: writeStrategy,
    },
    {
      path: '/myHome',
      component: myStrategy,
      children: [
        {
          path: 'myStrategy',
          name: 'myStrategy',
          component: myStrategy,
          // meta: {
          //   keepAlive: true   //true,页面不带navbar和footer
          // },
        },
        {
          path: 'writeStrategy',
          name: 'writeStrategy',
          component: writeStrategy,
          // meta: {
          //   keepAlive: true   //true,页面不带navbar和footer
          // },
        },
        {
          path: 'myFavorites',
          name: 'myFavorites',
          component: myFavorites,
          // meta: {
          //   keepAlive: true   //true,页面不带navbar和footer
          // },
        }
      ],
      meta: {
        keepAlive: true   //true,页面不带navbar和footer
      },
    },
    {
      path: '/hotelBusiness',
      component: hotelBusiness,
      children: [
        {
          path: 'myHotel',
          name: 'myHotel',
          component: myHotel,
          meta: {
            keepAlive: true   //true,页面不带navbar和footer
          },
        },
        {
          path: 'regHotel',
          name: 'regHotel',
          component: regHotel,
          meta: {
            keepAlive: true   //true,页面不带navbar和footer
          },
        },
        {
          path: 'roomMgt',
          name: 'roomMgt',
          component: roomMgt,
          meta: {
            keepAlive: true   //true,页面不带navbar和footer
          },
        }
      ],
      meta: {
        keepAlive: true   //true,页面不带navbar和footer
      },
    },
    {
      path: '/scenicBusiness',
      component: scenicBusiness,
      children: [
        {
          path: 'myScenic',
          name: 'myScenic',
          component: myScenic,
          meta: {
            keepAlive: true   //true,页面不带navbar和footer
          },
        },
        {
          path: 'regScenic',
          name: 'regScenic',
          component: regScenic,
          meta: {
            keepAlive: true   //true,页面不带navbar和footer
          },
        },
        {
          path: 'ticketMgt',
          name: 'ticketMgt',
          component: ticketMgt,
          meta: {
            keepAlive: true   //true,页面不带navbar和footer
          },
        }
      ],
      meta: {
        keepAlive: true   //true,页面不带navbar和footer
      }
    },
  ]
})
