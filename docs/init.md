# 主工程

## 创建工程

```
npm init vite@latest accounting --template vue-ts
```

## ESLint

### 引入 ESLint

```
npm i eslint -D
```

### TypeScript 支持

```
npm i @typescript-eslint/parser @typescript-eslint/eslint-plugin -D
```

### Vue3 支持

```
npm i eslint-plugin-vue vue-eslint-parser -D
```

### IDE 支持

安装 VSCode 插件 ESLint

settings.json:

```
"editor.formatOnSave": true,
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true
}
```

### 编写规则

.eslintrc.json

## Prettier

### 引入 Prettier

```
npm i prettier eslint-config-prettier eslint-plugin-prettier -D
```

### IDE 支持

安装 VSCode 插件 Prettier

settings.json:

```
"editor.formatOnSave": true
```

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

commitlint.config.ts

```
module.exports = {
  extends: ['@commitlint/config-conventional']
}
```

## ElementPlus

```
npm i element-plus
npm install -D unplugin-vue-components unplugin-auto-import

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default {
  plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
}
```

## Vue-Router

```
npm install vue-router@4
```

## SCSS

```
npm install --save-dev sass
```

## Pinia

```
npm install pinia
```

## axios

```
npm install axios
```

## Electron

```
npm install electron --save-dev
```

## electron-builder

```
npm install electron-builder --save-dev
```

## esbuild

```
npm i esbuild --save-dev
```

## chokidar

```
npm install chokidar --save-dev
```

## @element-plus/icons-vue

```
npm install @element-plus/icons-vue
```

## font-awesome

```
npm i --save @fortawesome/fontawesome-svg-core
npm i --save @fortawesome/free-solid-svg-icons
npm i --save @fortawesome/free-regular-svg-icons
npm i --save @fortawesome/vue-fontawesome@prerelease
```
