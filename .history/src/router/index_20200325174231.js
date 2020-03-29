/*
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-01-09 13:31:07
 * @LastEditors: lixiang
 * @LastEditTime: 2020-03-25 17:42:31
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index',
    },
    {
      path: '/index',
      component: () => import('@/components/index/index'),
    },
    {
      path: '/login',
      component: () => import('@/components/login/login'),
      meta: {
        keepAlive: true   //true,页面不带navbar和footer
      }
    },
    {
      path: '/register',
      component:  () => import('@/components/register/register'),
      meta: {
        keepAlive: true   
      }
    },
    {
      path: '/destination',
      component: () => import('@/components/destination/destination'),
      children: [
        {
          path: 'scenicRmd',
          name: 'scenicRmd',
          component: () => import('@/components/destination/scenicRmd/scenicRmd'),
          // meta: {
          //   keepAlive: true   //true,页面不带navbar和footer
          // },
        },
      ]
    },
    {
      path: '/strategy',
      component: () => import('@/components/strategy/strategy'),
    },
    {
      path: '/shop',
      component: () => import('@/components/shop/shop'),
    },
    {
      path: '/hotel',
      component: () => import('@/components/hotel/hotel'),
    },
    {
      path: '/hotelDetial',
      component: () => import('@/components/hotel/hotelDetial'),
    },
    {
      path: '/scenicDetial',
      component: () => import('@/components/destination/scenicDetial'),
    },
    
    {
      path: '/writeStrategy',
      component: () => import('@/components/strategy/writeStrategy/writeStrategy'),
    },
    {
      path: '/viewStrategy',
      component: () => import('@/components/strategy/viewStrategy/viewStrategy'),
    },
    
    {
      path: '/myHome',
      component: () => import('@/components/home/myHome'),
      children: [
        {
          path: 'myStrategy',
          name: 'myStrategy',
          component: () => import('@/components/home/myStrategy/myStrategy'),
          meta: {
            keepAlive: true   //true,页面不带navbar和footer
          },
        },
        {
          path: 'myFavorites',
          name: 'myFavorites',
          component: () => import('@/components/home/myFavorites/myFavorites'),
          meta: {
            keepAlive: true   //true,页面不带navbar和footer
          },
        },
        {
          path: 'myOrder',
          name: 'myOrder',
          component: () => import('@/components/home/myOrder/myOrder'),
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
      path: '/hotelBusiness',
      component: () => import('@/components/hotelBusiness/hotelBusiness'),
      children: [
        {
          path: 'myHotel',
          name: 'myHotel',
          component: () => import('@/components/hotelBusiness/myHotel/myHotel'),
          meta: {
            keepAlive: true   //true,页面不带navbar和footer
          },
        },
        {
          path: 'regHotel',
          name: 'regHotel',
          component: () => import('@/components/hotelBusiness/regHotel/regHotel'),
          meta: {
            keepAlive: true   //true,页面不带navbar和footer
          },
        },
        {
          path: 'roomMgt',
          name: 'roomMgt',
          component: () => import('@/components/hotelBusiness/roomMgt/roomMgt'),
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
      component: () => import('@/components/scenicBusiness/scenicBusiness'),
      children: [
        {
          path: 'myScenic',
          name: 'myScenic',
          component: () => import('@/components/scenicBusiness/myScenic/myScenic'),
          meta: {
            keepAlive: true   //true,页面不带navbar和footer
          },
        },
        {
          path: 'regScenic',
          name: 'regScenic',
          component: () => import('@/components/scenicBusiness/regScenic/regScenic'),
          meta: {
            keepAlive: true   //true,页面不带navbar和footer
          },
        },
        {
          path: 'ticketMgt',
          name: 'ticketMgt',
          component: () => import('@/components/scenicBusiness/ticketMgt/ticketMgt'),
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
