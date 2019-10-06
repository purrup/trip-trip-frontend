import Vue from 'vue'
import Vuex from 'vuex'

import feature from './modules/feature'
import account from './modules/account'
import trip from './modules/trip'
import notification from './modules/notification'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    feature,
    account,
    trip,
    notification
  }
})
