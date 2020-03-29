/*
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-03-24 15:03:46
 * @LastEditors: lixiang
 * @LastEditTime: 2020-03-28 18:07:16
 */
import request from '@/utils/request'

export function addOrder(data) {
  return request({
    url: '/order/add',
    method: 'post',
    data:data
  })
}

export function searchMyOrder(status, orderType, pageNo, pageSize) {
  // return request({
  //   url: '/order/myOrder',
  //   method: 'get',
  //   data:data
  // })
  if (status != null) {
      return request({
          url: orderType != null ? ('/order/myOrder?status=' + status + '&orderType=' + orderType
          + '&pageNo=' + pageNo + '&pageSize=' + pageSize)
              : ('/order/myOrder?orderType=' + orderType + '&pageNo=' + pageNo + '&pageSize=' + pageSize),
          method: 'get',
      })
  } else {
      return request({
          url: orderType !=null ? ('/order/myOrder?orderType=' + orderType
          + '&pageNo=' + pageNo + '&pageSize=' + pageSize)
              : ('/order/myOrder?pageNo=' + pageNo + '&pageSize=' + pageSize),
          method: 'get',
      })
  }
}
