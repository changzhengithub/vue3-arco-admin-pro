import Mock from 'mockjs'
import { builder, getBody } from '../util'

const username = ['admin', 'super']
// 强硬要求 ant.design 相同密码
// '21232f297a57a5a743894a0e4a801fc3',
const password = ['123456', 'admin'] // admin, ant.design

const login = (options) => {
  const body = getBody(options)
  if (!username.includes(body.username) || !password.includes(body.password)) {
    return builder({ isLogin: true }, '账户或密码错误', 401)
  }

  const userInfo = {
    id: Mock.mock('@guid'),
    name: Mock.mock('@name'),
    role: 1,
    username: 'admin',
    password: '',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
    status: 1,
    telephone: '',
    lastLoginIp: '27.154.74.117',
    lastLoginTime: 1534837621348,
    creatorId: 'admin',
    createTime: 1497160610259,
    deleted: 0,
    roleId: 'admin',
    lang: 'zh-CN'
  }

  return builder({
    userInfo,
    token: '4291d7da9005377ec9aec4a71ea837f'
  }, '', 200, { 'Custom-Header': Mock.mock('@guid') })
}

const logout = () => {
  return builder({}, '[测试接口] 注销成功', 200)
}

const info = () => {
  const userInfo = {
    id: '4291d7da9005377ec9aec4a71ea837f',
    name: '超级管理员',
    role: 1,
    username: 'admin',
    password: '',
    avatar: '/avatar2.jpg',
    status: 1,
    telephone: '',
    lastLoginIp: '27.154.74.117',
    lastLoginTime: 1534837621348,
    creatorId: 'admin',
    createTime: 1497160610259,
    merchantCode: 'TLif2btpzg079h15bk',
    deleted: 0,
    roleId: 'admin'
  }

  return builder(userInfo, '获取用户信息', 200)
}


Mock.mock(/\/auth\/login/, 'post', login)
Mock.mock(/\/auth\/logout/, 'post', logout)
Mock.mock(/\/user\/info/, 'get', info)