import request from '@/utils/request'
export function fetchList(parentId) {
  return request({
    url:'/eshop/sys/category/tree/'+parentId,
    method:'get',
    // params:params
  })
}

export function fetchLevelList(parentId) {
  return request({
    url:'/eshop/sys/category/tree/'+parentId,
    method:'get',
    // params:params
  })
}

export function handleAddLevel(params) {
  return request({
    url:'/eshop/sys/category',
    method:'post',
    data:params
  })
}

export function handleDeleteLevelRequest(id) {
  return request({
    url:'/eshop/sys/category/' + id,
    method:'delete',
  })
}
export function handleEditLevel(id,params) {
  return request({
    url:'/eshop/sys/category/' + id,
    method:'put',
    data:params
  })
}
export function deleteProductCate(id) {
  return request({
    url:'/productCategory/delete/'+id,
    method:'post'
  })
}

export function createProductCate(data) {
  return request({
    url:'/productCategory/create',
    method:'post',
    data:data
  })
}

export function updateProductCate(id,data) {
  return request({
    url:'/productCategory/update/'+id,
    method:'post',
    data:data
  })
}

export function getProductCate(id) {
  return request({
    url:'/productCategory/'+id,
    method:'get',
  })
}

export function updateShowStatus(data) {
  return request({
    url:'/productCategory/update/showStatus',
    method:'post',
    data:data
  })
}

export function updateNavStatus(data) {
  return request({
    url:'/productCategory/update/navStatus',
    method:'post',
    data:data
  })
}

export function fetchListWithChildren() {
  return request({
    url:'/eshop/sys/category/tree/0',
    method:'get'
  })
}
