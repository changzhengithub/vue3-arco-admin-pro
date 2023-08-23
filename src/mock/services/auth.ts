import Mock from 'mockjs'
import { builder, getBody } from '../util'

const name = ['admin', 'super']
// 强硬要求 ant.design 相同密码
// '21232f297a57a5a743894a0e4a801fc3',
const password = ['123456', 'admin'] // admin, ant.design

const login = (options: any) => {
  const body = getBody(options)
  if (!name.includes(body.name) || !password.includes(body.password)) {
    return builder({
      message: '账户或密码错误',
      code: 401,
      data: {
        isLogin: true
      }
    })
  }

  const userInfo = {
    id: 1,
    name: '超级管理员',
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
    merchantCode: 'TLif2btpzg079h15bk',
    deleted: 0,
    roleId: 'admin',
    menu_perm: ['home', 'account', 'message_center', 'system_setting'],
    operate_perm: []
  }

  return builder({
    message: '登陆成功',
    code: 200,
    data: userInfo,
    token: '4291d7da9005377ec9aec4a71ea837f'
  })
}

const logout = () => {
  return builder({
    message: '[测试接口] 注销成功',
    code: 200,
    data: null
  })
}

const info = () => {
  const userInfo = {
    id: 1,
    name: '超级管理员',
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
    merchantCode: 'TLif2btpzg079h15bk',
    deleted: 0,
    roleId: 'admin',
    menu_perm: ['home', 'account', 'message_center', 'system_setting'],
    operate_perm: []
  }

  return builder({
    message: '获取用户信息',
    code: 200,
    data: userInfo
  })
}


Mock.mock(/\/api\/login/, 'post', login)
Mock.mock(/\/auth\/logout/, 'post', logout)
Mock.mock(/\/api\/owner\/info/, 'get', info)