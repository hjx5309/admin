import request from '@/utils/request'

export function login(account, password) {
  return request({
    url: '/passport/account/login',
    method: 'post',
    data: {
      account,
      password,
      device: 'PC'
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/passport/logout',
    method: 'post',
    data: {
      device: 'PC'
    }
  })
}
