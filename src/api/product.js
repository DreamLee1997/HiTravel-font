import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/eshop/product/all',
    method:'get',
  })
}

export function fetchParamsList(params) {
  return request({
    url:'/eshop/product/list',
    method:'post',
    data:params
  })
}

export function updateProductInfo(pid,data) {
  return request({
    url:'/eshop/product/'+pid,
    method:'put',
    data:data
  })
}

export function AddProduct(params) {
  return request({
    url:'/eshop/product',
    method:'post',
    data:params
  })
}

export function fetchSimpleList(params) {
  return request({
    url:'/product/simpleList',
    method:'get',
    params:params
  })
}

export function updateDeleteStatus(pId) {
  return request({
    url:'/eshop/product/' + pId,
    method:'delete',
  })
}

export function updateNewStatus(params) {
  return request({
    url:'/product/update/newStatus',
    method:'post',
    params:params
  })
}

export function updateRecommendStatus(params) {
  return request({
    url:'/product/update/recommendStatus',
    method:'post',
    params:params
  })
}

export function updatePublishStatus(params) {
  return request({
    url:'/product/update/publishStatus',
    method:'post',
    params:params
  })
}

export function createProduct(data) {
  return request({
    url:'/product/create',
    method:'post',
    data:data
  })
}

export function updateProduct(id,data) {
  return request({
    url:'/product/update/'+id,
    method:'post',
    data:data
  })
}

export function getProduct(id) {
  return request({
    url:'/product/updateInfo/'+id,
    method:'get',
  })
}

