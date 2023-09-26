<template>
  <div class="index">
    <div class="index-editor">
      <div style="border: 1px solid #ccc">
        <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" mode="simple" />
        <Editor style="height: 500px; overflow-y: hidden;" v-model="valueHtml" :defaultConfig="editorConfig" mode="simple" @onCreated="handleCreated"  @onChange="onChange" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="FormModel">
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
// import type { FormList } from './types'
import storage from 'store'
import { Message } from '@arco-design/web-vue'
import { ACCESS_TOKEN } from '@/constants/app'

import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { Boot } from '@wangeditor/editor'


// 自定义菜单
class UploadMenu {
  constructor() {
    this.title = '上传附件'
    this.iconSvg = '<svg t="1671283908578" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1624" width="48" height="48"><path d="M924.672 126.976q36.864 36.864 54.784 82.432t17.92 93.696-17.92 93.696-54.784 82.432l-392.192 389.12q-36.864 36.864-90.624 61.44t-113.664 28.672-122.368-16.384-115.712-73.728q-52.224-52.224-72.704-113.152t-16.384-121.344 28.16-113.664 60.928-90.112l348.16-345.088q9.216-9.216 27.136-4.608t27.136 13.824q8.192 9.216 13.312 27.136t-4.096 27.136l-347.136 344.064q-27.648 27.648-46.08 64.512t-21.504 78.848 12.288 84.992 55.296 82.944q35.84 35.84 79.36 50.688t86.528 12.288 81.92-18.944 66.56-44.032l391.168-388.096q27.648-27.648 39.424-57.344t11.264-58.88-13.824-56.832-36.864-51.2q-44.032-43.008-98.816-40.448t-110.08 57.856l-353.28 351.232q-23.552 23.552-23.04 52.224t18.944 47.104q22.528 22.528 51.712 18.432t47.616-22.528l320.512-318.464q9.216-9.216 27.136-4.608t27.136 13.824 14.336 27.136-4.096 27.136l-321.536 318.464q-36.864 36.864-70.656 51.2t-63.488 12.8-55.296-15.872-47.104-34.816q-17.408-16.384-31.232-41.984t-15.872-56.32 10.752-65.536 49.664-70.656q18.432-18.432 32.768-33.792 12.288-13.312 23.04-23.552t11.776-11.264l285.696-284.672q36.864-36.864 80.384-57.856t88.576-24.064 88.576 12.288 80.384 52.224z" fill="#595959" p-id="1625"></path></svg>'
    this.tag = 'button'
  }

  getValue(editor) {
    return ''
  }

  isActive(editor) {
    return false // or true
  }

  isDisabled(editor) {
    return false // or true
  }

  exec(editor, value) {
    if (store.state.publicVuex.isUploadFile) return
    store.commit('setIsUploadFile', true)
  }
}
const UploadMenuConf = {
  key: 'UploadMenu',
  factory() {
    return new UploadMenu()
  }
}
Boot.registerMenu(UploadMenuConf)

// 图片上传接口配置
const baseUrl = import.meta.env.VITE_APP_API_BASE_URL
const token = storage.get(ACCESS_TOKEN)
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
// 内容 HTML
const valueHtml = ref('<p>hello</p>')

// 模拟 ajax 异步获取内容
onMounted(() => {
  setTimeout(() => {
    valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
  }, 1500)
})

// 工具栏配置
const toolbarConfig = {
  toolbarKeys: [
    // 菜单 key
    'headerSelect',
    'blockquote',
    '|', // 分割线
    'bold',
    'underline',
    'italic',
    'through',
    'code',
    '|',
    'color',
    'bgColor',
    '|',
    'fontSize',
    'fontFamily',
    'lineHeight',
    '|',
    'bulletedList',
    'numberedList',
    // 菜单组
    {
      key: 'group-justify',
      title: '对齐',
      iconSvg: '<svg viewBox="0 0 1024 1024"><path d="M768 793.6v102.4H51.2v-102.4h716.8z m204.8-230.4v102.4H51.2v-102.4h921.6z m-204.8-230.4v102.4H51.2v-102.4h716.8zM972.8 102.4v102.4H51.2V102.4h921.6z"></path></svg>',
      menuKeys: ['justifyLeft', 'justifyRight', 'justifyCenter', 'justifyJustify']
    },
    {
      key: 'group-indent',
      title: '缩进',
      iconSvg: '<svg viewBox="0 0 1024 1024"><path d="M0 64h1024v128H0z m384 192h640v128H384z m0 192h640v128H384z m0 192h640v128H384zM0 832h1024v128H0z m0-128V320l256 192z"></path></svg>',
      menuKeys: ['indent', 'delIndent']
    },
    '|',
    'emotion',
    'insertLink',
    {
      key: 'group-image',
      title: '图片',
      iconSvg: '<svg viewBox="0 0 1024 1024"><path d="M959.877 128l0.123 0.123v767.775l-0.123 0.122H64.102l-0.122-0.122V128.123l0.122-0.123h895.775zM960 64H64C28.795 64 0 92.795 0 128v768c0 35.205 28.795 64 64 64h896c35.205 0 64-28.795 64-64V128c0-35.205-28.795-64-64-64zM832 288.01c0 53.023-42.988 96.01-96.01 96.01s-96.01-42.987-96.01-96.01S682.967 192 735.99 192 832 234.988 832 288.01zM896 832H128V704l224.01-384 256 320h64l224.01-192z"></path></svg>',
      menuKeys: ['insertImage', 'uploadImage']
    },
    // {
    //   key: 'group-video',
    //   title: '视频',
    //   iconSvg: '<svg viewBox="0 0 1024 1024"><path d="M981.184 160.096C837.568 139.456 678.848 128 512 128S186.432 139.456 42.816 160.096C15.296 267.808 0 386.848 0 512s15.264 244.16 42.816 351.904C186.464 884.544 345.152 896 512 896s325.568-11.456 469.184-32.096C1008.704 756.192 1024 637.152 1024 512s-15.264-244.16-42.816-351.904zM384 704V320l320 192-320 192z"></path></svg>',
    //   menuKeys: ['insertVideo', 'uploadVideo']
    // },
    'insertTable',
    'UploadMenu',
    'codeBlock',
    'divider',
    '|',
    'undo',
    'redo',
    '|',
    'clearStyle'
  ]
}
const editorConfig = {
  placeholder: '请输入内容...',
  autoFocus: false,
  readOnly: false,
  // 工具栏里某个菜单配置
  MENU_CONF: {
    // 上传图片的配置
    uploadImage: {
      server: `${baseUrl}/api/user/uploadFile`,
      fieldName: 'file',
      meta: {
        editor_upload: 1
      },
      headers: {
        Authorization: token,
      },
      base64LimitSize: 10 * 1024, // 小于10kb
      maxFileSize: 10 * 1024 * 1024 // 10M
    },
    // 上传视频的配置
    uploadVideo: {
      server: `${baseUrl}/api/user/uploadFile`,
      fieldName: 'file',
      meta: {
        editor_upload: 1
      },
      headers: {
        Authorization: token
      },
      maxFileSize: 1024 * 1024 * 1024, // 1G
      maxNumberOfFiles: 1,
      allowedFileTypes: ['video/*'],
      onFailed(file, err, res) {
        console.log(file)
        console.log(res)
        Message.error(err.message)
      },
      onError(file, err, res) {
        console.log(file)
        console.log(res)
        Message.error(err.message)
      }
    }
  }
  // 鼠标悬浮显示菜单配置
  // hoverbarKeys: {}
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

const onChange = (editor) => {
  console.log(editor)
}

</script>

<style lang="less" scoped>
.index {
  width: 100%;
  padding: 20px;
  background-color: #fff;

  .index-module {
    width: 600px;
    min-height: 500px;

    .module-add {
      width: 500px;
      margin-bottom: 20px;
    }

    .module-wrap {
      width: 500px;
      margin-bottom: 20px;
      border: 1px solid #eee;
      border-radius: 10px;

      .wrap-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 40px;
        padding: 0 20px;
        border-bottom: 1px solid #eee;
      }

      .wrap-form {
        width: 100%;
        padding: 20px 0;
      }
    }
  }
}
</style>