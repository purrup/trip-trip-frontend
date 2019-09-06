import Vue from 'vue'
import Vuex from 'vuex'

import feature from './modules/feature'
import trips from './modules/trips'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    feature,
    trips
  }
})
