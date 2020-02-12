import request from '@/utils/request'

export function registerHotel(data) {
  return request({
    url: '/hotel/add',
    method: 'post',
    data: data
  })
}

export function getInfo() {
  return request({
    url: '/admin/info',
    method: 'get',
  })
}


