import { createRouter, createWebHashHistory } from 'vue-router'
import MainLayout from '@/layouts/main/main-layout.vue'
import LoginPage from '@/pages/login/login-page.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: MainLayout,
      redirect: '/login',
      children: [
        {
          path: '/login',
          component: LoginPage
        }
      ]
    }
  ]
})

export default router
