import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/eshop/sys/activity/list',
    method:'post',
    data:params
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
export function cancelActivityRequest(id) {
  return request({
    url:'/eshop/sys/activity/cancel/'+id,
    method:'post',
  })
}
export function updateStatus(id,params) {
  return request({
    url:'/flash/update/status/'+id,
    method:'post',
    params:params
  })
}
export function deleteFlash(id) {
  return request({
    url:'/flash/delete/'+id,
    method:'post'
  })
}
export function createFlash(data) {
  return request({
    url:'/flash/create',
    method:'post',
    data:data
  })
}
export function updateFlash(id,data) {
  return request({
    url:'/flash/update/'+id,
    method:'post',
    data:data
  })
}
