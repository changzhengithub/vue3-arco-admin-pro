import request from '@/utils/request'

// 接口地址
const api = {
  login: '/auth/login', // 登录
  logout: '/auth/logout', // 退出登录
  info: '/user/info' // 获取用户信息
}

// 登录
export function loginApi(parameter) {
  return request({
    url: api.login,
    method: 'post',
    data: parameter
  })
}

// 获取用户信息
export function infoApi(parameter) {
  return request({
    url: api.info,
    method: 'get',
    params: parameter
  })
}

// 退出登录
export function logoutApi(parameter) {
  return request({
    url: api.logout,
    method: 'post',
    data: parameter
  })
}
