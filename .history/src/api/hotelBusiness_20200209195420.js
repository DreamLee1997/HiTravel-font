/*
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-02-06 11:58:01
 * @LastEditors  : lixiang
 * @LastEditTime : 2020-02-09 19:54:20
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

export function updateHotel(params) {
  return request({
    url: '/hotel/update',
    method: 'post',
    data:params
  })
}

export function queryRoom(hotelId) {
  return request({
    url: '/room/queryByHotelId?hotelId='+hotelId+'&pageNo=1&pageSize=10',
    method: 'post',
    // data:params
  })
}