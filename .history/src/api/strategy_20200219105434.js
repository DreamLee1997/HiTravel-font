import request from '@/utils/request'

// export function registerHotel(params) {
//   return request({
//     url: '/hotel/add',
//     method: 'post',
//     data: params
//   })
// }

export function addStrategy(params) {
  return request({
    url:'/article/add',
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
// export function queryRoom(hotelId) {
//   return request({
//     url: '/room/queryByHotelId?hotelId=' + hotelId + '&pageNo=1&pageSize=10',
//     method: 'post',
//     // data:params
//   })
// }
