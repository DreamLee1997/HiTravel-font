import request from '@/utils/request'

export function queryProvince(username, password ,type) {
  return request({
    url: '/area/queryAllProvince?pageNo='+ 1 + '&pageSize	=' + 1000,
    method: 'post',
  })
}
// export function login(login_name, password) {
//   return request({
//     url: '/user/login?username=' + login_name + '&password=' + password + '&type=0',
//     method: 'post',
   
//   })
// }

export function getInfo() {
  return request({
    url: '/admin/info',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/admin/logout',
    method: 'post'
  })
}
