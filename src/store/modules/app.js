import Cookies from 'js-cookie'

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    },
    loading: false,
    redict: ''
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    },
    LOADING_SETTING: (state, status) => {
      state.loading = status
    },
    REDICT: (state, redictPath) => {
      state.redict = redictPath
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    ToggleLoading: ({ commit }, status) => {
      commit('LOADING_SETTING', status)
    },
    ToggleRedict: ({ commit }, redictPath) => {
      commit('REDICT', redictPath)
    }
  }
}

export default app
