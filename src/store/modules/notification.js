const state = {
  showNotification: false,
  successMsg: '',
  errorMsg: ''
}

const getters = {}

const mutations = {
  SET_SUCCESS_MSG (state, message) {
    state.showNotification = true
    state.successMsg = message
  },
  SET_ERROR_MSG (state, message) {
    state.showNotification = true
    state.errorMsg = message
  },
  DELETE_MESSAGE (state) {
    state.successMsg = ''
    state.errorMsg = ''
    state.showNotification = false
  }
}
const actions = {
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
