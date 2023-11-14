// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="vite/client" />
/// <reference types="./src/types/global.d.ts" />
/// <reference types="./src/types/api.d.ts" />
/// <reference types="./src/types/wangeditor.d.ts" />

/**
 * 全局声明文件
 * 在此自定义一些全局声明或者引入声明文件
 * 在此通过reference引入types中的声明文件，或者在tsconfig.json的include中匹配types下所有的.d.ts文件也可以
 * <reference types="./src/types/api.d.ts" />
 * */

// store声明
// declare module 'store'

declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const Component: DefineComponent<{}, {}, any>;
  export default Component;
}