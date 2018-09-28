const TokenKey = 'Admin-Token'

export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return localStorage.removeItem(TokenKey)
}
/* Layout */
import Layout from '../views/layout/Layout'
export function handPath(path) {
  var menusList = []
  for (let i = 0; i < path.length; i++) {
    var obj = {
      path: '/',
      component: Layout,
      redirect: '/' + path[i].children[0].url.split('.')[0],
      name: path[i].name,
      hidden: false,
      meta: { title: path[i].name, icon: 'example' },
      children: []
    }
    for (let j = 0; j < path[i].children.length; j++) {
      var pathObj = {
        path: path[i].children[j].url.split('.')[0],
        meta: { title: path[i].children[j].name, icon: 'table' },
        component: () => import(`@/views/` + path[i].children[j].url.split('.')[0])
      }
      obj.children.push(pathObj)
    }
    menusList.push(obj)
  }
  return menusList
}

