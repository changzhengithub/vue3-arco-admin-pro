<template>
  <div class="exception">
    <div class="exception-result">
      <div class="result-image">
        <svg width="60" height="60" viewBox="0 0 102 100" fill="none">
          <g clip-path="url(#404_svg__clip0_2:276)">
            <path d="M93.13 45.78H65.559v53.824H93.13V45.78z" fill="#F1F1F1" stroke="#150578" stroke-miterlimit="10"></path>
            <path d="M101.42 68.228H73.849l-8.29-22.448H93.13l8.29 22.448z" fill="#fff" stroke="#150578" stroke-miterlimit="10"></path>
            <path d="M65.559 45.78H9.616v53.824H65.56V45.78z" fill="#fff" stroke="#150578" stroke-miterlimit="10"></path>
            <path d="M56.538 68.228H.596l9.02-22.448H65.56l-9.02 22.448z" fill="#fff" stroke="#150578" stroke-miterlimit="10"></path>
            <path d="M48.216 34.577H25.585c-9.58 0-17.343-7.74-17.343-17.289C8.242 7.74 16.006 0 25.585 0h22.631c9.579 0 17.343 7.74 17.343 17.288 0 9.55-7.764 17.289-17.343 17.289z" fill="#F1F1F1"></path>
            <path d="M24.554 21.217a3.935 3.935 0 003.94-3.928 3.935 3.935 0 00-3.94-3.93 3.935 3.935 0 00-3.941 3.93 3.935 3.935 0 003.94 3.928zM36.903 21.217a3.935 3.935 0 003.941-3.928 3.935 3.935 0 00-3.941-3.93 3.935 3.935 0 00-3.941 3.93 3.935 3.935 0 003.941 3.928zM49.247 21.217a3.935 3.935 0 003.94-3.928 3.935 3.935 0 00-3.94-3.93 3.935 3.935 0 00-3.941 3.93 3.935 3.935 0 003.94 3.928z" fill="#006EFF"></path>
            <path d="M65.559 17.289v23.133s-2.883-5.845-17.343-5.845L65.56 17.289z" fill="#F1F1F1"></path>
          </g>
          <defs>
            <clipPath id="404_svg__clip0_2:276"><path fill="#fff" d="M0 0h102v100H0z"></path></clipPath>
          </defs>
        </svg>
      </div>
      <div class="result-desc">抱歉，页面不见了～</div>
    </div>
    <div class="exception-back">
      <a-button type="primary" @click="backHome">返回</a-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Setting',
  data() {
    return {
      tags: ['很有想法的', '专注设计', '辣~', '大长腿', '川妹子', '海纳百川']
    }
  },

  created() {
    this.getTeams()
  },
  methods: {
    getTeams() {
      this.$http.get('/workplace/teams').then(res => {
        this.teams = res.result
        this.teamSpinning = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
// .exception {
//   .flex_direction_center();
//   width: 100vw;
//   height: 100vh;
//   .exception-result {
//     width: 100%;
//     text-align: center;
//     .result-image {
//       margin-bottom: 30px;
//     }
//     .result-desc {
//       font-size: 14px;
//       color: #a9aeb8;
//     }
//   }
//   .exception-back {
//     width: 100%;
//     padding: 20px 0;
//     text-align: center;
//   }
// }
</style>
