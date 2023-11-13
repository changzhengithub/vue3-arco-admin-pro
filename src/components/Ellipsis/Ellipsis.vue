<script lang="tsx">
import { defineComponent, type VNode } from 'vue'
import { cutStrByFullLength, getStrFullLength } from '@/utils/util'

export default defineComponent({
  name: 'Ellipsis',
  props: {
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
    }
  },
  setup(props: any) {
    const getStrDom = (str: string, fullLength: number) => {
      return <span>{cutStrByFullLength(str, props.length) + (fullLength > props.length ? '...' : '')}</span>
    }
    const getTooltip = (fullStr: string, fullLength: number) => {
      return (
        <a-tooltip v-slots={{ content: fullStr}}>
          {getStrDom(fullStr, fullLength)}
        </a-tooltip>
      )
    }
    // 返回渲染函数
    return () => {
      // const { tooltip, length } = props
      // // console.log(this.$slots.default)
      // const str = props.default.map(vNode => vNode?.text).join('')
      // const fullLength = getStrFullLength(str)
      // const strDom = tooltip && fullLength > length ? getTooltip(str, fullLength) : getStrDom(str, fullLength)
      // return strDom
      return (
        <>
          <span style={{ marginRight: '10px' }}>111111</span>
          <button>+</button>
        </>
      )
    }
  }
})
</script>