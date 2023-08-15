import Mock from 'mockjs'
import { builder } from '../util'

const upload = () => {
  return builder({
    'path': './test/test',
  }, '', 200)
}

Mock.mock(/\/file\/upload/, 'post', upload)