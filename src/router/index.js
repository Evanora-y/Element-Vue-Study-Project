import { createRouter, createWebHistory } from 'vue-router'

import login from '../components/login.vue'
import home from '../components/home.vue'
import welcome from '../components/welcome.vue'
import user from '../components/user/users.vue'
import rights from '../components/rights/rights.vue'
import roles from '../components/rights/roles.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    { path: '/login', component: login },
    { path: '/', component: login },
    {
      path: '/home', component: home, redirect: '/welcome', children: [

        { path: '/welcome', component: welcome },
        { path: '/users', component: user },
        { path: '/rights', component: rights },
        { path: '/roles', component: roles }
      ]
    }

  ]
})


// 定义全局的路由导航守卫
router.beforeEach((to, from, next) => {


  if (to.path === '/login') return next();


  const tokenstr = window.sessionStorage.getItem("token");
  if (!tokenstr) return next('/login')
  next();




})


export default router
