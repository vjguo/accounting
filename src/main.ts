import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import '@/styles/index.scss'
import '@/plugins/qiankun.ts'

createApp(App).use(router).mount('#app')
