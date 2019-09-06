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

router.beforeEach((to, from, next) => {
  // const isLogin = localStorage.getItem('isLogin')
  // console.log(isLogin)
  // console.log(isLogin)
  // if (!isLogin) {
  //   next({ path: '/login' })
  // }
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
