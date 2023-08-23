import Mock from 'mockjs'
import { builder } from '../util'

const upload = () => {
  return builder({
    message: '',
    code: 200,
    data: {
      path: ''
    }
  })
}

Mock.mock(/\/file\/upload/, 'post', upload)