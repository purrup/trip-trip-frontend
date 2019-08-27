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

document.addEventListener('click', e => {
  if (store.getters['feature/isFocusOnSearchBar']) {
    if (e.target.closest('.search-bar-root')) {
      return
    }
    store.commit('feature/SET_isFocusOnSearchBar', false)
  }
})
