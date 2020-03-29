/*
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-02-29 12:43:12
 * @LastEditors: lixiang
 * @LastEditTime: 2020-03-26 16:06:33
 */
import request from '@/utils/request'

export function fetchList(pageNo, pageSize, cityCode) {
    return request({
        url: cityCode != "" ? ('/scenic/queryByPage?cityCode=' + cityCode + '&status=' + 1
            + '&pageNo=' + pageNo + '&pageSize=' + pageSize)
            : ('/scenic/queryByPage?status=' + 1 + '&pageNo=' + pageNo + '&pageSize=' + pageSize),
        method: 'post',
    })
}

export function searchScenic(scenicId) {
    return request({
        url: '/scenic/queryById?scenicId=' + scenicId,
        method: 'post',
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
