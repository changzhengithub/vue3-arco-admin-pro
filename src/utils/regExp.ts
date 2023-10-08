export default class regExp {
  // 手机号
  static phoneReg = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/g
  // 身份证
  static idReg = /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/g
  // 邮箱
  static emailReg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
  // 银行卡号
  static bankCardReg = /^[1-9]\d{9,29}$/
  // 邮政编码
  static postReg = /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/
  // 统一社会信用代码
  static ssCardReg = /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/
  // 密码
  static pwdReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!^()%*?&]{8,}$/ // 大于8位包含大小写字符、数字的字符串
  // 短信验证码
  static smsCodeReg = /^\d{4}$/
  // 公司名称
  static companyReg = /^[\u4e00-\u9fa5\\(\\)（）\da-zA-Z&]{2,50}$/gi
  // URL
  static urlReg = /^(http|https):\/\/[^\s]+$/
}