/**
 * 配置mitt公共组件传参
 * @desc 统一管理全局mitt事件，如不需要可注释
 * @desc 定义全局唯一Key，以MITT_开头，以区分其他常量
 * @author changz
 * */

import mitt from 'mitt'
import type { Events } from './types'


// const emitter = mitt()
const emitter = mitt<Events>()

export default emitter