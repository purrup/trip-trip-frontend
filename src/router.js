import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

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
      path: '/signin',
      name: 'Signin',
      meta: { showNavbar: false },
      component: () => import('./views/Signin.vue'),
      beforeEnter: function (to, from, next) {
        if (store.getters['account/getIsLogin'] === true) {
          return next({ path: from.path })
        }
        next()
      }
    },
    {
      path: '/signup',
      name: 'Signup',
      meta: { showNavbar: false },
      component: () => import('./views/Signup.vue'),
      beforeEnter: function (to, from, next) {
        if (store.getters['account/getIsLogin'] === true) {
          return next({ path: from.path })
        }
        next()
      }
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
      path: '/site/:id',
      name: 'Site',
      meta: { showNavbar: true },
      component: () => import('./views/Site.vue')
    }
  ]
})
