/*
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-02-06 11:58:01
 * @LastEditors  : lixiang
 * @LastEditTime : 2020-02-06 12:33:25
 */
import request from '@/utils/request'

export function registerHotel(params) {
  return request({
    url: '/hotel/add',
    method: 'post',
    data: params
  })
}

export function getInfo() {
  return request({
    url: '/admin/info',
    method: 'get',
  })
}


