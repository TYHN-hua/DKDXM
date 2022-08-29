import { login, getUserInfo } from '@/api/user'
import { setToken, getToken, removeToken } from '@/utils/auth'

export default {
  namespaced: true,
  state: {
    token: getToken(),
    userInfo: {}, // null
    hrsaasTime: ''
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      setToken(token)
    },
    removeToken(state) {
      state.token = null
      removeToken()
    },
    setUserInfo(state, userInfo) {
      // state.userInfo = { ...userInfo } //   浅拷贝
      state.userInfo = JSON.parse(JSON.stringify(userInfo))
    },
    removeUserInfo(state) {
      state.userInfo = {}
    },
    setHrsaasTime(state, time) {
      state.hrsaasTime = time
    }
  },
  actions: {
    // 通过接口获取token
    // commit setToken
    async login({ commit }, data) {
      const res = await login(data)
      console.log(res) // token
      commit('setHrsaasTime', Date.now())
      commit('setToken', res)
    },

    async getUserInfo() {
      const res = await getUserInfo()
      console.log(res)
    },
    // 通过接口获取用户信息
    // token 到底 验证
    logout({ commit }) {
      commit('removeToken')
      commit('removeUserInfo')
    }
  }
}
