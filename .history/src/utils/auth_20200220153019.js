import Cookies from 'js-cookie'

const TokenKey = 'loginToken'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function getUserName() {
  return Cookies.get(userName)
}
export function setUserName(userName) {
  return Cookies.set(userName, userName)
}

export function removeUserName() {
  return Cookies.remove(userName)
}

export function getRoles() {
  return Cookies.get(roles)
}

export function setRoles(role) {
  return Cookies.set(roles, role)
}

export function removeRoles() {
  return Cookies.remove(roles)
}

