import axios from '../../utils/axios'

const state = {
  isLogin: localStorage.getItem('isLogin') || false,
  expiration: new Date(localStorage.getItem('expiration')) || false,
  /** ***********/
  id: 1,
  username: 'MiaYang',
  introduction: "Hello I'm Mia",
  ownedTrips: [], // [ObjectId]
  collectedTrips: [], // [ObjectId]
  collectedSites: [], // [ObjectId]
  ratedTrips: [
    {
      id: 1, // ObjectId
      rating: Number
    }
  ]
}

const getters = {
  getIsLogin (state) {
    return state.isLogin
  }
}

const mutations = {
  SET_user (state, data) {
    Object.keys(data).forEach(key => {
      state[key] = data[key]
    })
  },
  SET_login (state) {
    localStorage.setItem('expiration', new Date(Date.now() + 1000 * 3600 * 24))
    localStorage.setItem('isLogin', true)
    state.isLogin = true
  },
  SET_logout (state) {
    state.isLogin = false
    localStorage.setItem('isLogin', false)
  }
}

const actions = {
  async signup (context, params) {
    try {
      const { data } = await axios('/signup', {
        method: 'post',
        data: params
      })
      context.commit('SET_user', data)
      context.commit('SET_login')
    } catch (error) {
      console.log(error)
    }
  },
  async signin (context, params) {
    try {
      const { data } = await axios('/signin', {
        method: 'post',
        data: params
      })
      context.commit('SET_user', data)
      context.commit('SET_login')
    } catch (error) {
      throw error
    }
  },
  async facebookLogin (context, data) {
    try {
    } catch (error) {
      console.log(error)
    }
  },
  async googleLogin (context, data) {
    try {
      console.log('here')
      await axios('/google', {
        method: 'get'
      })
    } catch (error) {
      console.log(error)
    }
  },
  async getUser (context) {
    try {
      const { data } = await axios('/users', {
        method: 'get'
      })
      context.commit('SET_user', data)
      context.commit('SET_login')
    } catch (error) {
      context.commit('SET_logout')
      console.log(error)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
