/*
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-02-09 16:34:45
 * @LastEditors: lixiang
 * @LastEditTime: 2020-03-28 10:13:55
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