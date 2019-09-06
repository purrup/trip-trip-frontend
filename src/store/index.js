import Vue from 'vue'
import Vuex from 'vuex'

import feature from './modules/feature'
import account from './modules/account'
import trip from './modules/trip'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    feature,
    account,
    trip
  }
})
