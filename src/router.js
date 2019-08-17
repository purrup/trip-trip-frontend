import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      meta: { hideNavbar: true },
      component: () => import('./views/Login.vue')
    },
    {
      path: '/signup',
      name: 'Signup',
      meta: { hideNavbar: true },
      component: () => import('./views/Signup.vue')
    },
    {
      path: '/trip',
      name: 'Trip',
      component: () => import('./views/Trip.vue')
    }
  ]
})
