import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/POST /user/findUserByPage',
    method:'post',
    data:params
  })
}

