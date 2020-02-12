/*
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-02-06 11:58:01
 * @LastEditors  : lixiang
 * @LastEditTime : 2020-02-07 13:37:38
 */
import request from '@/utils/request'

// export function registerHotel(params) {
//   return request({
//     url: '/hotel/add',
//     method: 'post',
//     data: params
//   })
// }

export function registerHotel(params) {
  return request({
    url:'/hotel/add',
    method:'post',
    data:params
  })
}

export function queryMyHotel() {
  return request({
    url: '/hotel/queryMyHotel',
    method: 'get',
  })
}


