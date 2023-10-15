/**
 * @description 定义多个全局自定义指令
 * @author changz
 * @example 在main.js引入之后use挂载
 * */

// 导入自定义指令
import clickout from './modules/click-out'
import watermark from './modules/watermark'
import page from './modules/page'
import permission from './modules/permission'


// 将所有要注册的自定义指令放到一个对象里
interface Directive {
  [key: string]: any
}
const directives: Directive = {
  clickout,
  watermark,
  page,
  permission
}

export default directives

// 使用插件进行挂载到app上
// export default {
//   install: (app: any) => {
//     Object.keys(directives).forEach((key) => {
//       app.directive(key, directives[key])
//     })
//   }
// }