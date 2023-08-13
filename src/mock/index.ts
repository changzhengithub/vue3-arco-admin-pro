// 判断环境是开发环境时，加载 mock 服务
if (import.meta.env.NODE_ENV === 'development') {
  // 使用同步加载依赖
  const Mock = require('mockjs')

  import './services/auth.ts'
  import './services/manage.ts'
  import './services/article.ts'
  import './services/file.ts'

  Mock.setup({
    timeout: 800 // setter delay time
  })
}

