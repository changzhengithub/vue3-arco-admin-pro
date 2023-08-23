/**
 * @desc 用户授权接口
 * 接口对传入参数和返回结果进行类型检查
 * */

import request from '@/utils/request'
import type * as Login from './types'

// 接口地址
const api = {
  login: '/api/login', // 登录
  logout: '/auth/logout', // 退出登录
  info: '/api/owner/info', // 获取用户信息
  captcha: '/api/captcha', // 获取验证码
  updatePwd: '/api/user/updatePwd' // 修改密码

  // login: '/auth/login', // 登录
  // logout: '/auth/logout', // 退出登录
  // info: '/user/info', // 获取用户信息
}

// 登录
export function loginApi(data: Login.LoginReq) {
  return request<Login.LoginRes>({
    url: api.login,
    method: 'post',
    data
  })
}

// 获取用户信息
export function infoApi() {
  return request<Login.UserInfoRes>({
    url: api.info,
    method: 'get'
    // params
  })
}

// 获取用户信息
export function captchaApi() {
  return request<Login.CaptchaRes>({
    url: api.captcha,
    method: 'get'
    // params
  })
}

// 退出登录
export function logoutApi() {
  return request({
    url: api.logout,
    method: 'post'
  })
}

// 修改密码
export function updatePwdApi(data: Login.UpdatePwdReq) {
  return request({
    url: api.updatePwd,
    method: 'post',
    data
  })
}