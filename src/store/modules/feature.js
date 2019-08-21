const state = {
  isFocusOnSearchBar: false
}

const getters = {
  isFocusOnSearchBar () {
    return state.isFocusOnSearchBar
  }
}

const mutations = {
  SET_isFocusOnSearchBar (state, boolean) {
    state.isFocusOnSearchBar = boolean
  }
}
const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
