// 登录
export interface LoginRequestData {
  username: string
  password: string
}
export type LoginResponseData = ApiResponseData<{ userInfo: UserInfo, token: string }>

// 用户信息
export type UserInfoResponseData = ApiResponseData<UserInfo>

// 退出
export type LoginOutResponseData = ApiResponseData<any>

// 修改密码
export interface UpdatePwdRequestData {
  old_pwd: string
  new_pwd: string
}
export type UpdatePwdResponseData = ApiResponseData<any>