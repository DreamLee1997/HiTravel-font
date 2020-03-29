/*
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-02-25 16:34:49
 * @LastEditors: lixiang
 * @LastEditTime: 2020-02-26 10:51:47
 */
import request from '@/utils/request'

export function fetchList(pageNo, pageSize, cityCode, hotelName) {
    if (cityCode != "") {
        return request({
            url: hotelName != "" ? ('/hotel/queryByPage?cityCode=' + cityCode + '&hotelName=' + hotelName
             + '&pageNo=' + pageNo + '&pageSize=' + pageSize)
                : ('/hotel/queryByPagecityCode=' + cityCode + '&pageNo=' + pageNo + '&pageSize=' + pageSize),
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

export function queryMyHotel() {
  return request({
    url: '/hotel/queryMyHotel',
    method: 'get',
  })
}

export function queryRoom(hotelId) {
  return request({
    url: '/room/queryByHotelId?hotelId=' + hotelId + '&pageNo=1&pageSize=10',
    method: 'post',
    // data:params
  })
}
