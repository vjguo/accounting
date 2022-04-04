import { createRouter, createWebHashHistory } from 'vue-router'
import LoginPage from '@/pages/login/LoginPage.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: LoginPage
    }
  ]
})

export default router
