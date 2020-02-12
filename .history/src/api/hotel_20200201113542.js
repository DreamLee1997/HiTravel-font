import request from '@/utils/request'

export function fetchList(pageNo, pageSize, streetCode) {
  return request({
    url: streetCode?('/hotel/queryByPage?streetCode=' + streetCode + 'pageNo=' + pageNo + '&pageSize=' + pageSize)
    :('/hotel/queryByPage?pageNo=' + pageNo + '&pageSize=' + pageSize),
    method: 'post',
  })
}