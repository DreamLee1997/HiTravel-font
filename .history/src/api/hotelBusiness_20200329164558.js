/*
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-02-06 11:58:01
 * @LastEditors: lixiang
 * @LastEditTime: 2020-03-29 16:45:58
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
    url: '/hotel/add',
    method: 'post',
    data: params
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
    data: params
  })
}

export function searchHotel(hotelId) {
  return request({
    url: '/hotel/queryById?hotelId=' + hotelId,
    method: 'post',
  })
}

export function queryRoom(hotelId) {
  return request({
    url: '/room/queryByHotelId?hotelId=' + hotelId + '&pageNo=1&pageSize=10',
    method: 'post',
  })
}

export function addRoom(params) {
  return request({
    url: '/room/add',
    method: 'post',
    data: params
  })
}

export function updateRoom(params) {
  return request({
    url: '/room/update',
    method: 'post',
    data: params
  })
}

export function searchRoom(id) {
  return request({
    url: '/room/queryById?roomId=' + id,
    method: 'post',
  })
}

export function queryOrderForStore(id, status, pageNo, pageSize) {
  return request({
    url: status != null ? ('/order/myOrderForStore?hotelOrScenicId=' + id + '&status=' + status + '&orderType=0' + '&pageNo=' + pageNo + '&pageSize=' + pageSize)
      : ('/order/myOrderForStore?hotelOrScenicId=' + id + '&orderType=0' + '&pageNo=' + pageNo + '&pageSize=' + pageSize),
    method: 'get',
  })
}