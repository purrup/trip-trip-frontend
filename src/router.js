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
      component: () => import('./views/Trips.vue'),
      async beforeEnter (to, from, next) {
        try {
          if (to.query.hasOwnProperty('keyword')) {
            const keyword = to.query.keyword
            await store.dispatch('trip/getTripsByKeyword', keyword)
          } else {
            const city = to.query['cities[]']
            await store.dispatch('trip/getTripByCountryAndCities', city)
          }
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
      path: '/sites/:id',
      name: 'Site',
      meta: { showNavbar: true },
      component: () => import('./views/Site.vue')
    },
    {
      path: '/users/:id',
      name: 'User',
      meta: { showNavbar: true },
      component: () => import('./views/User.vue')
    }
  ]
})
