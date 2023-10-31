import { createRouter, createWebHistory } from 'vue-router'
import login from '../components/login.vue'
import home from '../components/home.vue'
import welcome from '../components/welcome.vue'
import users from '../components/users/users.vue'
import roles from '../components/roles/roles.vue'
import rights from '../components/roles/rights.vue'
import goods from '../components/goods/goods.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',
      name: 'login',
      component: login
    },
    {

      path: '/home',
      name: 'home',
      component: home,
      children: [

        { path: '/welcome', component: welcome },
        { path: '/users', component: users },
        { path: '/roles', component: roles },
        { path: '/rights', component: rights },
        { path: '/goods', component: goods }


      ]

    }
  ]
})

export default router
