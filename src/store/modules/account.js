import axios from '../../utils/axios'
import siteApis from '@/utils/apis/site'
import trip from '@/store/modules/trip.js'
import notification from '@/store/modules/notification.js'

const state = {
  isLogin: localStorage.getItem('isLogin') || false,
  expiration: new Date(localStorage.getItem('expiration')) || false,
  /** ***********/
  _id: 1,
  isAdmin: false,
  username: 'MiaYang',
  introduction: "Hello I'm Mia",
  avatar: '',
  owningTrips: [], // [ObjectId]
  collectingTrips: [], // [ObjectId]
  collectingSites: [], // [ObjectId]
  ratingTrips: [
    {
      id: 1, // ObjectId
      rating: Number
    }
  ]
}

const getters = {
  getIsLogin (state) {
    return state.isLogin
  },
  getCollectingSites (state) {
    return state.collectingSites
  },
  getCollectingTrips (state) {
    return state.collectingTrips
  },
  getAccountId (state) {
    return state._id
  },
  getTripRating (state) {
    return function (tripId) {
      const trip = state.ratingTrips.filter(trip => trip.id === tripId)[0]
      return trip ? trip.userRating : 0
    }
  },
  getIsAdmin (state) {
    return state.isAdmin
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
  },
  TOGGLE_collectedSite (state, placeId) {
    if (state.collectingSites.includes(placeId)) {
      state.collectingSites = state.collectingSites.filter(siteId => siteId !== placeId)
    } else {
      state.collectingSites.push(placeId)
    }
  },
  TOGGLE_collectedTrip (state, tripId) {
    if (state.collectingTrips.includes(tripId)) {
      state.collectingTrips = state.collectingTrips.filter(id => id !== tripId)
    } else {
      state.collectingTrips.push(tripId)
    }
  },
  SET_avatar (state, avatar) {
    state.avatar = avatar
  },
  RATE_trip (state, params) {
    state.ratingTrips.push(params)
  },
  CREATE_trip (state, trip) {
    state.owningTrips.push(trip)
  }
}

const actions = {
  async signup ({ commit }, params) {
    try {
      const { data } = await axios('/signup', {
        method: 'post',
        data: params
      })
      commit('SET_user', data)
      commit('SET_login')
    } catch (error) {
      if (error.response.status === 409) {
        notification.mutations.SET_ERROR_MSG(notification.state, error.response.data.message)
      } else {
        console.log(error)
      }
    }
  },
  async signin ({ commit }, params) {
    try {
      const { data } = await axios('/signin', {
        method: 'post',
        data: params
      })
      commit('SET_user', data)
      commit('SET_login')
    } catch (error) {
      throw error
    }
  },
  async logout ({ commit }) {
    await axios('/logout', {
      method: 'post'
    })
    commit('SET_logout')
  },
  async getUser ({ commit }) {
    try {
      const { data } = await axios('/users', {
        method: 'get'
      })
      commit('SET_user', data)
      commit('SET_login')
    } catch (error) {
      commit('SET_logout')
      console.log(error)
    }
  },
  async editProfile ({ commit }, formData) {
    try {
      await axios('/users', {
        method: 'patch',
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 0,
        data: formData
      })
    } catch (error) {
      console.log(error)
    }
  },
  async toggleCollectedSite ({ commit }, placeId) {
    try {
      commit('TOGGLE_collectedSite', placeId)
      await siteApis.toggleCollectedSite(placeId)
    } catch (error) {
      console.log(error)
    }
  },
  async toggleCollectedTrip ({ commit }, tripId) {
    try {
      commit('TOGGLE_collectedTrip', tripId)
      await trip.actions.toggleCollectedTrip(trip.state, tripId)
    } catch (error) {
      console.log(error)
    }
  },
  async forgotPassword ({ commit }, email) {
    try {
      console.log(email)
      await axios('/users/forgot_password', {
        method: 'post',
        data: email
      })
      notification.mutations.SET_SUCCESS_MSG(notification.state, '已寄送密碼確認信，請至此信箱收信')
    } catch (error) {
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
