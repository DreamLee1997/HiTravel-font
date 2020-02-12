/*
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-01-22 10:33:56
 * @LastEditors: lixiang
 * @LastEditTime: 2020-01-22 10:36:00
 */
import request from '@/utils/request'

export function register(data) {
  return request({
    url: '/user/add',
    method: 'post',
    data:data
  })
}

// export function getInfo() {
//   return request({
//     url: '/admin/info',
//     method: 'get',
//   })
// }

