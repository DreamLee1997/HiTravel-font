import request from '@/utils/request'
export function bindProductRequest(id, ids) {
  return request({
    url:'/eshop/sys/activity/bind/' + id,
    method:'post',
    data:ids
  })
}

export function unbindActivityRequest(id, ids) {
    return request({
      url:'/eshop/sys/activity/unbind/' + id,
      method:'post',
      data:ids
    })
  }
export function getActivityProduct(id) {
    return request({
      url:'/eshop/sys/activity/' + id,
      method:'get',
    })
  }
export function addActivityRequest(params) {
  return request({
    url:'/eshop/sys/activity',
    method:'post',
    data:params
  })
}

export function editActivityRequest(id,params) {
  return request({
    url:'/eshop/sys/activity/'+id,
    method:'put',
    data:params
  })
}
