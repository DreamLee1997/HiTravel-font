/*
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-02-25 16:34:49
 * @LastEditors: lixiang
 * @LastEditTime: 2020-03-23 14:30:38
 */
import request from '@/utils/request'

export function fetchList(pageNo, pageSize, hotelName, cityCode) {
    if (cityCode != "") {
        return request({
            url: hotelName != "" ? ('/hotel/queryByPage?cityCode=' + cityCode + '&hotelName=' + hotelName
             + '&pageNo=' + pageNo + '&pageSize=' + pageSize)
                : ('/hotel/queryByPage?cityCode=' + cityCode + '&pageNo=' + pageNo + '&pageSize=' + pageSize),
            method: 'get',
        })
    } else {
        return request({
            url: hotelName !="" ? ('/hotel/queryByPage?hotelName=' + hotelName
             + '&pageNo=' + pageNo + '&pageSize=' + pageSize)
                : ('/hotel/queryByPage?pageNo=' + pageNo + '&pageSize=' + pageSize),
            method: 'get',
        })
    }
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
        // data:params
    })
}

export function queryRoomByTime(hotelId, inDate) {
    return request({
        url: '/room/queryByHotelId?hotelId=' + hotelId + '&inDate=' + inDate + '&pageNo=1&pageSize=10',
        method: 'post',
        // data:params
    })
}