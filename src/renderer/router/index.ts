import { createRouter, createWebHashHistory } from 'vue-router'
import DefaultLayout from '@/layouts/default/default-layout.vue'
import LoginPage from '@/pages/login/login-page.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
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
