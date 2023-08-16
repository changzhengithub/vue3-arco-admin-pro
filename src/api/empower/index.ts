/**
 * @desc 用户授权接口
 * 接口对传入参数和返回结果进行类型检查
 * */

import request from '@/utils/request'
import type * as Login from './types'

// 接口地址
const api = {
  login: '/auth/login', // 登录
  logout: '/auth/logout', // 退出登录
  info: '/user/info', // 获取用户信息
  updatePwd: '/api/user/updatePwd' // 修改密码
}

// 登录
export function loginApi(data: Login.LoginRequestData) {
  return request<Login.LoginResponseData>({
    url: api.login,
    method: 'post',
    data
  })
}

// 获取用户信息
export function infoApi() {
  return request<Login.LoginOutResponseData>({
    url: api.info,
    method: 'get'
    // params
  })
}


// 退出登录
export function logoutApi() {
  return request<Login.LoginOutResponseData>({
    url: api.logout,
    method: 'post'
  })
}

// 修改密码
export function updatePwdApi(data: Login.UpdatePwdRequestData) {
  return request<Login.UpdatePwdResponseData>({
    url: api.updatePwd,
    method: 'post',
    data
  })
}