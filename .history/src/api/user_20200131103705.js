/*
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-01-09 19:48:30
 * @LastEditors: lixiang
 * @LastEditTime: 2020-01-31 10:37:01
 */
import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/user/findUserByPage',
    method:'post',
    data:params
  })
}

