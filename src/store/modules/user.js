import { login, logout } from '@/api/login'
import { getToken, removeToken, handPath } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2413045416,3916296131&fm=27&gp=0.jpg',
    roles: [],
    path: []
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
    },
    SET_PATH: (state, path) => {
      state.path = path
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.account.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.data
          commit('SET_TOKEN', getToken())
          commit('SET_NAME', data.name)
          commit('SET_ROLES', data.userType)
          const userMenus = handPath(data.userMenus)
          localStorage.setItem('menus', JSON.stringify(data.userMenus))
          commit('SET_PATH', userMenus)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetMenu({ commit, state }) {
      return new Promise((resolve, reject) => {
        var menu = localStorage.getItem('menus')
        if (menu) {
          const Menus = handPath(JSON.parse(menu))
          commit('SET_PATH', Menus)
          resolve()
        } else {
          reject(new Error('无路由'))
        }
        // getInfo(state.token).then(response => {
        //   const data = response.data
        //   commit('SET_ROLES', data.roles)
        //   commit('SET_NAME', data.name)
        //   commit('SET_AVATAR', data.avatar)
        //   resolve(response)
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
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
