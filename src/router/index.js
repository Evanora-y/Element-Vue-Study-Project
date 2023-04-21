import { createRouter, createWebHistory } from 'vue-router'

import login from '../components/login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {

      path:'/login',
      component :login
    },
    {

      path:'/',component:login

    }

  ]
})

export default router
