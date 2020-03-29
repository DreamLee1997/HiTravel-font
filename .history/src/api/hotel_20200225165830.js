/*
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-02-25 16:34:49
 * @LastEditors: lixiang
 * @LastEditTime: 2020-02-25 16:58:30
 */
import request from '@/utils/request'

export function fetchList(pageNo, pageSize, cityCode, hotelName) {
    if (cityCode != "") {
        return request({
            url: hotelName != "" ? ('/article/queryArticleByPage?cityCode=' + cityCode + '&hotelName=' + hotelName
             + '&pageNo=' + pageNo + '&pageSize=' + pageSize)
                : ('/article/queryArticleByPage?cityCode=' + cityCode + '&pageNo=' + pageNo + '&pageSize=' + pageSize),
            method: 'get',
        })
    } else {
        return request({
            url: hotelName !='undefined' ? ('/article/queryArticleByPage?hotelName=' + hotelName
             + '&pageNo=' + pageNo + '&pageSize=' + pageSize)
                : ('/article/queryArticleByPage?pageNo=' + pageNo + '&pageSize=' + pageSize),
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
