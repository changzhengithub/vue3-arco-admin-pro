/**
 * 依赖注入定义唯一Key和声明类型
 * @desc 定义全局唯一key，在provide和inject中引入使用
 * @desc 定义key统一以PROVIDE_开头，以区分其他常量
 * @example 调用示例
 * import { PROVIDE_STRING } from '@/provide'
 * provide(PROVIDE_STRING, 'hello world')
 * const foo = inject(PROVIDE_STRING)
 * */

import type { InjectionKey } from 'vue'
import type { UserInfo } from './types'


// 定义一个类型为string的key
export const PROVIDE_STRING = Symbol('STRING_KEY') as InjectionKey<string>

// 定义一个类型为UserInfo的key
export const PROVIDE_USER_INFO = Symbol('USER_INFO') as InjectionKey<UserInfo>

// ...其他key
