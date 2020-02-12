/*
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-02-09 16:34:45
 * @LastEditors  : lixiang
 * @LastEditTime : 2020-02-09 16:46:42
 */
import request from '@/utils/request'

export function registerScence(params) {
  return request({
    url:'/scenic/add',
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

