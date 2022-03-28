# 主工程
## 创建工程
```
npm init vite@latest oa --template vue
```
## ESLint
### 引入ESLint
```
npm i eslint -D
```
### TypeScript支持
```
npm i @typescript-eslint/parser @typescript-eslint/eslint-plugin -D
```
### Vue3支持
```
npm i eslint-plugin-vue vue-eslint-parser -D
```
### IDE支持
安装VSCode插件ESLint

settings.json:

```
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true
}
```
### 编写规则
.eslintrc.json
## Prettier
### 引入Prettier
```
npm i prettier eslint-config-prettier eslint-plugin-prettier -D
```
### IDE支持
安装VSCode插件Prettier
### 编写规则
.prettierrc.js
## husky
```
npm i -D husky
npx husky install
```
## lint-staged
```
npx mrm@2 lint-staged
```
.lintstagedrc.json:
```
"*.{vue,js,ts,jsx,tsx,md,json}": "eslint --fix"
```
## commitlint
```
npm install --save-dev @commitlint/config-conventional @commitlint/cli
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
```
.commitlint.config.js
```
module.exports = {
  extends: ['@commitlint/config-conventional']
}
```