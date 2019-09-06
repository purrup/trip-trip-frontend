import axios from '../../utils/axios'

const state = {
  isLogin: localStorage.getItem('isLogin') || false,
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
  }
}

const actions = {
  async signup (context, data) {
    try {
      await axios('/signup', {
        method: 'post',
        data: data
      })
    } catch (error) {
      console.log(error)
    }
  },
  async signin (context, data) {
    try {
      await axios('/signin', {
        method: 'post',
        data: data
      })
    } catch (error) {
      console.log(error)
    }
  },
  async getUser (context) {
    try {
      const { data } = await axios('/user', {
        method: 'get'
      })
      context.commit('SET_user', data)
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
