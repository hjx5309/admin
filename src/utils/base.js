export default {
  install(Vue, options) {
    // 时间格式化
    Vue.prototype.fmtTime = obj => {
      if (!obj) {
        return ''
      }
      var time = parseInt(obj)
      var date = new Date(time)
      var y = 1900 + date.getYear()
      var m = '0' + (date.getMonth() + 1)
      var d = '0' + date.getDate()
      var h = '0' + date.getHours()
      var mm = '0' + date.getMinutes()
      var s = '0' + date.getSeconds()
      return (
        y +
        '-' +
        m.substring(m.length - 2, m.length) +
        '-' +
        d.substring(d.length - 2, d.length) +
        ' ' +
        h.substring(h.length - 2, h.length) +
        ':' +
        mm.substring(mm.length - 2, mm.length) +
        ':' +
        s.substring(s.length - 2, s.length)
      )
    }

    // 深度克隆
    Vue.prototype.objDeepCopy = source => {
      var sourceCopy = source instanceof Array ? [] : {}
      for (var item in source) {
        sourceCopy[item] = typeof source[item] === 'object' ? Vue.prototype.objDeepCopy.objDeepCopy(source[item]) : source[item]
      }
      return sourceCopy
    }
    // 状态格式化
    Vue.prototype.handStatus = status => {
      if (!status) {
        return ''
      }
      if (status === -1) {
        return '已禁用'
      } else if (status === 1) {
        return '已启用'
      }
    }
  }
}
