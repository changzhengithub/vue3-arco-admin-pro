// 登录
export interface LoginReq {
  name: string
  password: string
  // code: string
  // key: string
}
export type LoginRes = ApiResponseData<UserInfo>

// 用户信息
export type UserInfoRes = ApiResponseData<UserInfo>

// 修改密码
export interface UpdatePwdReq {
  old_pwd: string
  new_pwd: string
}

// 验证码
interface Captcha {
  img: string
  key: string
}
export type CaptchaRes = ApiResponseData<Captcha>