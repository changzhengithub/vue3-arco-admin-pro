// 登录
export interface UpdatePwdRequestData {
  old_pwd: string
  new_pwd: string
}
export type UpdatePwdResponseData = ApiResponseData<any>

// 用户信息
export type UserInfoResponseData = ApiResponseData<UserInfo>

// 退出
export type LoginOutResponseData = ApiResponseData<any>