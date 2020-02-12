/*
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-01-09 19:48:30
 * @LastEditors  : lixiang
 * @LastEditTime : 2020-02-06 13:43:56
 */
import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { Message } from 'element-ui';

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
          // let tokenHead = "Bearer"
          const tokenStr = data.token
          Message({
            message: '登陆成功',
            type: 'success',
            duration: 1000
          });
          setToken(tokenStr)
          commit('SET_TOKEN', tokenStr);
          commit('SET_ROLES', data.type);
          commit('SET_NAME', userInfo.username);
          if(data.type){
            if(data.type === "1"){
              vue.$router.push({path:'/index'});
            }else if(data.type === "2"){
              //酒店商户
              vue.$router.push({path:'/hotelBusiness'});
            }else{
              //景区商户
              vue.$router.push({path:'/scenicSpotBusiness'});
            }
          }
          // Message('登陆成功');
          // vue.$router.push({path:'/index'});
          // const tokenStr = data.token
          
          // commit('SET_AVATAR', data.icon)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
      
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
    LogOut({ commit, state }) {
      
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

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
