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
      path: '/signin',
      name: 'Signin',
      meta: { showNavbar: false },
      component: () => import('./views/Signin.vue')
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
      component: () => import('./views/Trips.vue'),
      async beforeEnter (to, from, next) {
        try {
          await store.dispatch('trip/getTrips')
          next()
        } catch (error) {
          throw error
        }
      }
    },
    {
      path: '/trips/:id',
      name: 'Trip',
      meta: { showNavbar: true },
      component: () => import('./views/Trip.vue'),
      async beforeEnter (to, from, next) {
        try {
          await store.dispatch('trip/getTrip', to.params.id)
          next()
        } catch (error) {
          throw error
        }
      }
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
