import request from '@/utils/request'

export function login(login_name, pageSize) {
  return request({
    url: '/hotel/queryByPage?pageNo=' + login_name + '&pageSize=' + password + '&type=0',
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