import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'Home',
      meta: { showNavbar: false },
      component: () => import('./views/Home.vue')
    },
    {
      path: '/login',
      name: 'Login',
      meta: { showNavbar: false },
      component: () => import('./views/Login.vue')
    },
    {
      path: '/signup',
      name: 'Signup',
      meta: { showNavbar: false },
      component: () => import('./views/Signup.vue')
    },
    {
      path: '/trips',
      name: 'Trips',
      meta: { showNavbar: true },
      component: () => import('./views/Trips.vue')
      // async beforeEnter (to, from, next) {
      //   try {
      //     await store.dispatch('trips/getTrips')
      //     next()
      //   } catch (error) {
      //     throw error
      //   }
      // }
    },
    {
      path: '/trip/:id',
      name: 'Trip',
      meta: { showNavbar: true },
      component: () => import('./views/Trip.vue')
    },
    {
      path: '/sites',
      name: 'Sites',
      meta: { showNavbar: true },
      component: () => import('./views/Sites.vue')
    },
    {
      path: '/site',
      name: 'Site',
      meta: { showNavbar: true },
      component: () => import('./views/Site.vue')
    }
  ]
})
