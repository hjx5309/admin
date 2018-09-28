/**
 * Created by jiachenpan on 16/11/18.
 */

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}
const isType = function(Type) {
  return function(obj) {
    return Object.prototype.toString.call(obj) === '[object ' + Type + ']'
  }
}
/**
 * 判断是否为数组
 */
export function isArray() {
  return isType('Array')
}
/** 判断是否为字符串 */
export function isString() {
  return isType('String')
}
/** 判断是否为函数 */
export function isFunction() {
  return isType('Function')
}
/** 判断是否为对象 */
export function isObject() {
  return isType('Object')
}
/* Layout */
import Layout from '../views/layout/Layout'
// 处理路径
export function handPath(path) {
  if (isArray(path)) {
    if (path.length === 0) {
      return []
    }
    var menusList = []
    for (let i = 0; i < path.length; i++) {
      var obj = {
        path: '/',
        component: Layout,
        redirect: '/',
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
  } else {
    console.log('不是数组')
    return []
  }
}
