/*
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-02-06 11:58:01
 * @LastEditors: lixiang
 * @LastEditTime: 2020-02-06 12:00:18
 */
import request from '@/utils/request'

export function registerHotel(data) {
  return request({
    url: '/hotel/add',
    method: 'post',
    data: data
  })
}

export function getInfo() {
  return request({
    url: '/admin/info',
    method: 'get',
  })
}


