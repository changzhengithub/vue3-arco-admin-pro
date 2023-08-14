// 使用同步加载依赖
import Mock from 'mockjs'
import './services/auth.ts'
import './services/manage.ts'
import './services/article.ts'
import './services/file.ts'

// 判断环境是开发环境时，加载 mock 服务
if (import.meta.env.VITE_ENV === 'development') {
  Mock.setup({
    timeout: 800 // setter delay time
  })
}