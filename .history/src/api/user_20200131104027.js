/*
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-01-09 19:48:30
 * @LastEditors  : lixiang
 * @LastEditTime : 2020-01-31 10:40:22
 */
import request from '@/utils/request'
export function fetchList(pageNo,pageSize) {
  return request({
    url:'/user/findUserByPage?pageNo=' + 1 + 'pageSize=' ,
    method:'post',
    // data:params
  })
}

