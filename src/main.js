import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

router.beforeResolve(async (to, from, next) => {
  const isLogin = localStorage.getItem('isLogin')
  const expiration = new Date(localStorage.getItem('expiration'))
  const currentDate = new Date()
  if (isLogin === 'true') {
    if (expiration > currentDate) {
      await store.dispatch('account/getUser')
    } else {
      store.commit('account/SET_logout')
    }
  }
  next()
})

document.addEventListener('click', e => {
  if (store.getters['feature/isFocusOnSearchBar']) {
    if (e.target.closest('.search-bar-root')) {
      return
    }
    store.commit('feature/SET_isFocusOnSearchBar', false)
  }
})
