import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/main/main-layout.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/base'
    },
    {
      path: '/base:baseAppPath(.*)',
      component: MainLayout
    }
  ]
})

export default router
