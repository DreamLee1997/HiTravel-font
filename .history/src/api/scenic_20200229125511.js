/*
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-02-29 12:43:12
 * @LastEditors: lixiang
 * @LastEditTime: 2020-02-29 12:55:11
 */
import request from '@/utils/request'

export function fetchList(pageNo, pageSize, cityCode, hotelName) {
    // if (cityCode != "") {
        return request({
            url: cityCode != "" ? ('/scenic/queryByPage?cityCode=' + cityCode + '&status=' + 1
             + '&pageNo=' + pageNo + '&pageSize=' + pageSize)
                : ('/scenic/queryByPage?status=' + 1 + '&pageNo=' + pageNo + '&pageSize=' + pageSize),
            method: 'get',
        })
    // } else {
    //     return request({
    //         url: hotelName != "" ? ('/hotel/queryByPage?hotelName=' + hotelName
    //          + '&pageNo=' + pageNo + '&pageSize=' + pageSize)
    //             : ('/hotel/queryByPage?pageNo=' + pageNo + '&pageSize=' + pageSize),
    //         method: 'get',
    //     })
    // }
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