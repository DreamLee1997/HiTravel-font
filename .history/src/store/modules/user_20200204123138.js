/*
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-01-09 19:48:30
 * @LastEditors  : lixiang
 * @LastEditTime : 2020-02-04 12:31:37
 */
import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, {userInfo, vue}) {
      // const username = userInfo.username.trim() 
      // const username = userInfo.username
      return new Promise((resolve, reject) => {
        login(userInfo.username, userInfo.password, userInfo.userType).then(response => {
          const data = response.data
          let tokenHead = "Bearer"
          const tokenStr = tokenHead+data.token
          console.log(vue);
          vue.$message({
            message: '登陆成功',
            type: 'success',
            duration: 1000
          });
          console.log(12233333);
          vue.$router.push({path:'/index'});
          // const tokenStr = data.token
          setToken(tokenStr)
          commit('SET_TOKEN', tokenStr)
          commit('SET_ROLES', data.type)
          commit('SET_NAME', userInfo.username)
          // commit('SET_AVATAR', data.icon)
         
          
          
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
      // const username = userInfo.username.trim()
      // return new Promise((resolve, reject) => {
      //   login(username, userInfo.password).then(response => {
      //     const data = response.data
      //     let tokenHead = "Bearer"
      //     const tokenStr = tokenHead+data.token
      //     // const tokenStr = data.token
      //     setToken(tokenStr)
      //     commit('SET_TOKEN', tokenStr)
      //     commit('SET_ROLES', 0)
      //     commit('SET_NAME', username)
      //     // commit('SET_AVATAR', data.icon)
      //     resolve()
      //   }).catch(error => {
      //     reject(error)
      //   })
      // })
    },

    //获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const data = response.data
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.username)
          commit('SET_AVATAR', data.icon)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    // LogOut({ commit, state }) {
      
      // return new Promise((resolve, reject) => {
      //   logout(state.token).then(() => {
      //     commit('SET_TOKEN', '')
      //     commit('SET_ROLES', [])
      //     removeToken()
      //     resolve()
      //   }).catch(error => {
      //     reject(error)
      //   })
      // })
    // },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
