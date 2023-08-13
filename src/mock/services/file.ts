import Mock from 'mockjs'
import { builder } from '../util'

const upload = (options) => {
  return builder({
    'path': './test/test',
  })
}

Mock.mock(/\/file\/upload/, 'post', upload)