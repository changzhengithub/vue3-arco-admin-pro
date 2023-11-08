/**
 * mitt传参类型定义
 * @desc 统一管理全局mitt事件，并进行类型标注
 * @desc 定义全局唯一Key，以MITT_开头，以区分其他常量
 * */

interface UserInfo {
  name: string
}

export type Events = {
  'MITT_GET_USERINFO': UserInfo,
  'MITT_GET_NUMBER'?: number
}