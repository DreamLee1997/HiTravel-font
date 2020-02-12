/*
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-02-09 16:34:45
 * @LastEditors  : lixiang
 * @LastEditTime : 2020-02-11 13:34:43
 */
import request from '@/utils/request'

export function registerScence(params) {
  return request({
    url:'/scenic/add',
    method:'post',
    data:params
  })
}


export function queryMyScenic() {
  return request({
    url: '/scenic/queryMyScenic',
    method: 'get',
  })
}

// export function updateHotel(params) {
//   return request({
//     url: '/hotel/update',
//     method: 'post',
//     data:params
//   })
// }

