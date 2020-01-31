import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/eshop/sys/user/list',
    method:'post',
    data:params
  })
}

