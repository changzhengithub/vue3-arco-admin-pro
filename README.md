# arco-admin-pro

基于Vue3+Vite+Ts+Arco 构建的后台管理系统。

## IDE设置

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (并禁用 Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

### 开启Volar Takeover 模式
在添加Volar插件后，Volar 提供了一个叫做“Takeover 模式”的功能。在这个模式下，Volar 能够使用一个 TS 语言服务实例同时为 Vue 和 TS 文件提供支持，要开启这个模式需要在VSCode中禁用默认的TS语言服务。

* 在当前项目的工作空间下，用 Ctrl + Shift + P (mac：Cmd + Shift + P) 唤起命令面板。
* 输入 built，然后选择“Extensions：Show Built-in Extensions”。
* 在插件搜索框内输入 typescript (不要删除 @builtin 前缀)。
* 点击“TypeScript and JavaScript Language Features”右下角设置，然后选择禁用。
* 重新加载工作空间。Takeover 模式将会在你打开一个 Vue 或者 TS 文件时自动启用。

## 代码检查

格式化代码安装prettier插件，如需自动代码检查请安装Eslint插件。

## 项目构建

```sh
npm install
npm run dev
npm run build-only
```