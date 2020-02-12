/*
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-02-09 16:34:45
 * @LastEditors: lixiang
 * @LastEditTime: 2020-02-09 16:35:43
 */
import request from '@/utils/request'

export function registerHotel(params) {
  return request({
    url:'/scence/add',
    method:'post',
    data:params
  })
}

// export function queryMyHotel() {
//   return request({
//     url: '/hotel/queryMyHotel',
//     method: 'get',
//   })
// }

// export function updateHotel(params) {
//   return request({
//     url: '/hotel/update',
//     method: 'post',
//     data:params
//   })
// }

