/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'standard-with-typescript',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: ['./tsconfig.json', './tsconfig.app.json', './tsconfig.node.json'],
    ecmaVersion: 'latest'
  },
  plugins: [
    'vue'
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/strict-boolean-expressions': ['off'],
    '@typescript-eslint/prefer-optional-chain': ['off'], // 首选可选链
    '@typescript-eslint/restrict-plus-operands': ['off'], // 是否限制加操作数
    '@typescript-eslint/no-base-to-string': ['off'], // 是否限制加操作数
    '@typescript-eslint/consistent-type-assertions': ['off'], // 一致类型断言
    'vue/multi-word-component-names': ['off'], // 是否强制组件名称多单词
    'camelcase': 'off', // 是否强制使用驼峰拼写法命名规定
    'space-before-function-paren': 'off', // 是否强制方法圆括号左边空格
    'no-multiple-empty-lines': 'off', // 不允许多个空行
    'new-cap': 'off', // 构造函数名首字母大写
    'eol-last': 'off', // 要求或禁止文件末尾存在空行
    'dot-notation': 'off', // 允许不使用点表示写法
    'vue/no-mutating-props': ['off'], // 关闭Vue不能修改props警告
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
