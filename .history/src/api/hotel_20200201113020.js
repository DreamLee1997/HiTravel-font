import request from '@/utils/request'

export function login(login_name, password) {
  return request({
    url: '/user/login?username=' + login_name + '&password=' + password + '&type=0',
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
}/hotel/queryByPage