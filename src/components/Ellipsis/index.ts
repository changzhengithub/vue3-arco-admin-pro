import Tooltip from '@arco-design/web-vue/es/tooltip'
// import { cutStrByFullLength, getStrFullLength } from '@/utils/util'

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
  // methods: {
  //   getStrDom(str, fullLength) {
  //     return <span>{cutStrByFullLength(str, this.length) + (fullLength > this.length ? '...' : '')}</span>
  //   },
  //   getTooltip(fullStr, fullLength) {
  //     return (
  //       <Tooltip>
  //         <template slot="title">{fullStr}</template>
  //         {this.getStrDom(fullStr, fullLength)}
  //       </Tooltip>
  //     )
  //   }
  // },
  // render() {
  //   const { tooltip, length } = this.$props
  //   // console.log(this.$slots.default)
  //   const str = this.$slots.default.map(vNode => vNode.text).join('')
  //   const fullLength = getStrFullLength(str)
  //   const strDom = tooltip && fullLength > length ? this.getTooltip(str, fullLength) : this.getStrDom(str, fullLength)
  //   return strDom
  // }
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