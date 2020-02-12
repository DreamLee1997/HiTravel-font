import request from '@/utils/request'

export function login(pageNo, pageSize, ) {
  return request({
    url: '/hotel/queryByPage?streetCode='pageNo=' + pageNo + '&pageSize=' + pageSize,
    method: 'post',
    // data: {
    //   login_name,
    //   password,
    // }
  })
  // return request({
  //   url: '/admin/login',
  //   method: 'post',
  //   data: {
  //     username,
  //     password
  //   }
  // })
}