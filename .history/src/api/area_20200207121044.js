/*
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-02-06 14:45:46
 * @LastEditors  : lixiang
 * @LastEditTime : 2020-02-07 12:10:44
 */
import request from '@/utils/request'
//获取省
export function queryProvince(pageNo,pageSize) {
    return request({
        url: '/area/queryAllProvince?pageNo=' + pageNo + '&pageSize=' + pageSize,
        method: 'post',
    })
}
//获取市
export function queryCity(provinceCode, pageNo, pageSize) {
    return request({
        url: '/area/queryCitysByProvinceCode?provinceCode=' + provinceCode + '&pageNo=' + pageNo + '&pageSize=' + pageSize,
        method: 'post',
    })
}
//获取区
export function queryArea(cityCode, pageNo, pageSize) {
    return request({
        url: '/area/queryAreaByCityCode?cityCode=' + cityCode + '&pageNo=' + pageNo + '&pageSize=' + pageSize,
        method: 'post',
    })
}
//获取街道
export function queryStreet(areaCode, pageNo, pageSize) {
    return request({
        url: '/area/queryStreetByAreaCode?areaCode=' + areaCode + '&pageNo=' + pageNo + '&pageSize=' + pageSize,
        method: 'post',
    })
}
