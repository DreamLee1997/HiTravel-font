/*
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-02-19 10:53:01
 * @LastEditors  : lixiang
 * @LastEditTime : 2020-02-19 16:42:45
 */
import request from '@/utils/request'

export function addStrategy(params) {
  return request({
    url: '/article/add',
    method: 'post',
    data: params
  })
}

export function queryMyHotel(status, pageNo, pageSize) {
  if (status) {
    return request({
      url: '/article/queryMyArticle?status=' + status + '&pageNo=' + pageNo + '&pageSize=' + pageSize,
      method: 'get',
    })
  } else {
    return request({
      url: '/article/queryMyArticle?pageNo=' + pageNo + '&pageSize=' + pageSize,
      method: 'get',
    })
  }

}
// export function queryRoom(hotelId) {
//   return request({
//     url: '/room/queryByHotelId?hotelId=' + hotelId + '&pageNo=1&pageSize=10',
//     method: 'post',
//     // data:params
//   })
// }
