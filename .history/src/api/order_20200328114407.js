/*
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-03-24 15:03:46
 * @LastEditors: lixiang
 * @LastEditTime: 2020-03-24 15:04:25
 */
import request from '@/utils/request'

export function addOrder(data) {
  return request({
    url: '/order/add',
    method: 'post',
    data:data
  })
}

export function searchMyOrder(data) {
  return request({
    url: '/order/myOrder',
    method: 'get',
    data:data
  })
}
