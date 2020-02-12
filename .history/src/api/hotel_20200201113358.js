import request from '@/utils/request'

export function login(pageNo, pageSize, streetCode) {
  return request({
    url: '/hotel/queryByPage?streetCode=' + streetCode + 'pageNo=' + pageNo + '&pageSize=' + pageSize,
    method: 'post',
  })
}