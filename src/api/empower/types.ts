// 默认返回数据格式
export type DefaultRes = ApiResponseData<any>

// 登录
export interface LoginReq {
  name: string
  password: string
  code: string
  key: string
}
export type LoginRes = ApiResponseData<{ userInfo: UserInfo, token: string }>

// 用户信息
export type UserInfoRes = ApiResponseData<UserInfo>

// 退出
export type LoginOutRes = ApiResponseData<any>

// 修改密码
export interface UpdatePwdReq {
  old_pwd: string
  new_pwd: string
}
export type UpdatePwdRes = ApiResponseData<any>

// 