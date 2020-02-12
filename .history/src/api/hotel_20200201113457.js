import request from '@/utils/request'

export function login(pageNo, pageSize, streetCode) {
  return request({
    url: streetCode?('/hotel/queryByPage?streetCode=' + streetCode + 'pageNo=' + pageNo + '&pageSize=' + pageSize):('/hotel/queryByPage?streetCode=' + streetCode + 'pageNo=' + pageNo + '&pageSize=' + pageSize),
    method: 'post',
  })
}