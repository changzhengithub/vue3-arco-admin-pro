import Tooltip from '@arco-design/web-vue/es/tooltip'
import { cutStrByFullLength, getStrFullLength } from '@/utils/util'

import { h, defineComponent, resolveDynamicComponent, type DefineComponent } from 'vue'

export default defineComponent({
  name: 'Ellipsis',
  components: {
    Tooltip
  },
  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-ellipsis'
    },
    tooltip: {
      type: Boolean
    },
    length: {
      type: Number,
      required: true
    },
    lines: {
      type: Number,
      default: 1
    },
    fullWidthRecognition: {
      type: Boolean,
      default: false
    }
  },
  setup(props: any) {
    // const getStrDom = (str: string, fullLength: number) => {
    //   return <span>{cutStrByFullLength(str, props.length) + (fullLength > props.length ? '...' : '')}</span>
    // }
    // const getTooltip = (fullStr: string, fullLength: number) => {
    //   return (
    //     <Tooltip>
    //       <template slot="title">{fullStr}</template>
    //       {this.getStrDom(fullStr, fullLength)}
    //     </Tooltip>
    //   )
    // }
    const Component = resolveDynamicComponent(props.icon)
    // 返回渲染函数
    return () => h(<DefineComponent>Component)
  }
})