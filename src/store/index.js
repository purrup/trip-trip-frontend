import Vue from 'vue'
import Vuex from 'vuex'

import feature from './modules/feature'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    feature
  }
})
