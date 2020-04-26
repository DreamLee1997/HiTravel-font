/*
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-02-09 16:34:45
 * @LastEditors: lixiang
 * @LastEditTime: 2020-04-06 15:52:03
 */
import request from '@/utils/request'

export function registerScence(params) {
  return request({
    url:'/scenic/add',
    method:'post',
    data:params
  })
}

export function queryMyScenic() {
  return request({
    url: '/scenic/queryMyScenic',
    method: 'get',
  })
}

export function deleteScenic(scenicId) {
  return request({
    url: '/scenic/delete?scenicId=' + scenicId,
    method: 'get',
  })
}

export function searchScenic(scenicId) {
  return request({
    url: '/scenic/queryById?scenicId=' + scenicId ,
    method: 'post',
  })
}

export function updateScenic(params) {
  return request({
    url: '/scenic/update',
    method: 'post',
    data:params
  })
}

export function addTicket(params) {
  return request({
    url: '/ticket/add',
    method: 'post',
    data:params
  })
}

export function updateTicket(params) {
  return request({
    url: '/ticket/update',
    method: 'post',
    data:params
  })
}

export function searchTicket(scenicId) {
  return request({
    url: '/ticket/queryById?scenicId=' + scenicId ,
    method: 'post',
  })
}

export function queryTicket(scenicId, pageNo, pageSize) {
  return request({
    url: '/ticket/queryByPage?scenicId=' + scenicId +'&pageNo=' + pageNo + '&pageSize=' + pageSize,
    method: 'post',
  })
}

export function queryOrderForStore(id, status, pageNo, pageSize) {
  return request({
    url: status != null ? ('/order/myOrderForStore?hotelOrScenicId=' + id + '&status=' + status + '&orderType=1' + '&pageNo=' + pageNo + '&pageSize=' + pageSize)
      : ('/order/myOrderForStore?hotelOrScenicId=' + id + '&orderType=1' + '&pageNo=' + pageNo + '&pageSize=' + pageSize),
    method: 'get',
  })
}