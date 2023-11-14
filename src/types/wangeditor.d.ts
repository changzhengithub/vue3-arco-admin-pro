/**
 * wangEditor编辑器类型声明扩展
 * @desc 为模块“@wangeditor/editor-for-vue”声明文件
 * @desc 可以去@wangeditor/editor-for-vue包里查看文件导出了什么内容，然后为导出内容做声明
 * */

declare module '@wangeditor/editor-for-vue' {
  import { DefineComponent } from 'vue'
  const Editor: DefineComponent<{}, {}, any>
  const Toolbar: DefineComponent<{}, {}, any>
  export { Editor, Toolbar }
}