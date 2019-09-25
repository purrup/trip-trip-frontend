import axios from '../../utils/axios'
import router from '@/router.js'

const state = {
  trips: [{
    'name': '2019 花東行',
    'days': 3,
    'country': '臺灣',
    'cities': [ '花蓮', '台東' ],
    'startDate': '2019-01-01',
    'isPrivate': false,
    'journal': '此趟行程包括花蓮、台東最值得造訪的景點，你能夠到山上享受清新空氣、看到大片金黃的金針花海，也能夠到七星潭、三仙台看到蔚藍的海洋，除此之外，還有刺激的泛舟、令人垂涎的當地美食、私房景點等著你！',
    'content': [
      {
        'activities': [
          {
            'name': '秀姑巒溪泛舟',
            'cost': 800,
            'startTime': '2019-01-01 10:30:00',
            'endTime': '2019-01-01 15:00:00'
          },
          {
            'name': '花蓮東大門夜市',
            'cost': 300,
            'startTime': '2019-01-01 18:00:00',
            'endTime': '2019-01-01 19:00:00'
          }
        ],
        'note': '泛舟之旅會附帶午餐，東大門夜市可以從旅館借腳踏車騎過去'
      },
      {
        'activities': [
          {
            'name': '六十石山',
            'cost': 300,
            'startTime': '2019-01-02 10:00:00',
            'endTime': '2019-01-01 14:00:00'
          },
          {
            'name': '七星潭',
            'cost': 100,
            'startTime': '2019-01-02 16:00:00',
            'endTime': '2019-01-02 18:00:00'
          }
        ],
        'note': '七星潭不能把石頭帶走喔～'
      },
      {
        'activities': [
          {
            'name': '三仙台',
            'cost': 0,
            'startTime': '2019-01-03 10:00:00',
            'endTime': '2019-01-03 12:00:00'
          },
          {
            'name': '知本溫泉',
            'cost': 400,
            'startTime': '2019-01-03 15:00:00',
            'endTime': '2019-01-03 17:00:00'
          }
        ],
        'note': '溫泉要穿泳衣才能進去泡'
      }
    ],
    'sites': [
      ['秀姑巒溪', '花蓮東大門夜市'],
      ['六十石山', '七星潭'],
      ['三仙台', '知本溫泉']
    ],
    'comments': [
      {
        'date': '2019-03-03 10:00:00',
        'text': '花東真的值得一去！',
        'replies': [
          {
            'date': '2019-03-04 13:10:00',
            'text': '+1'
          }
        ]
      },
      {
        'date': '2019-03-10 14:00:00',
        'text': '台灣最美麗的地方'
      }
    ]
  }],
  trip: {
  }
}

const getters = {}

const mutations = {
  SET_TRIPS (state, data) {
    state.trips = data
  },
  SET_TRIP (state, data) {
    state.trip = data
  },
  ADD_comment (state, data) {
    state.trip.comments.unshift(data)
  },
  REVISE_comment (state, { text, commentId }) {
    const index = state.trip.comments.findIndex(comment => comment.id === commentId)
    state.trip.comments[index].text = text
  },
  DELETE_comment (state, commentId) {
    state.trip.comments = state.trip.comments.filter(comment => comment.id !== commentId)
  }
}

const actions = {
  async getPopularTrips (context) {
    try {
      const { data } = await axios('/trips/popular', {
        method: 'get'
      })
      return data
    } catch (error) {
      throw error
    }
  },
  async getTripByCountryAndCities ({ commit }, city) {
    try {
      const { data } = await axios.get(`/trips/?country=台灣&cities[]=${city}`)
      commit('SET_TRIPS', data)
    } catch (error) {
      console.log(error)
    }
  },
  async getTripsByKeyword ({ commit }, keyword) {
    try {
      const { data } = await axios.get(`/trips/search/?keyword=${keyword}`)
      commit('SET_TRIPS', data)
    } catch (error) {
      console.log(error)
    }
  },
  async getTrip (context, id) {
    try {
      const results = await axios(`/trips/${id}`, {
        method: 'get'
      })
      context.commit('SET_TRIP', results.data)
    } catch (error) {
      throw error
    }
  },
  async toggleCollectedTrip (context, id) {
    try {
      await axios.patch(`/trips/${id}/collect`)
    } catch (error) {
      console.log(error)
    }
  },
  async forkTrip (context, id) {
    try {
      const { data } = await axios.post(`/trips/${id}/fork`)
      router.push(`/trips/${data._id}`)
    } catch (error) {
      console.log(error)
    }
  },
  async addComment ({ commit }, text) {
    try {
      const { data } = await axios(`/trips/${state.trip._id}/comment`, {
        method: 'patch',
        data: { text }
      })
      commit('ADD_comment', data)
    } catch (error) {
      console.log(error)
    }
  },
  async reviseComment ({ commit }, { text, commentId }) {
    try {
      const params = { text, commentId }
      commit('REVISE_comment', params)
      await axios(`/trips/${state.trip._id}/comment`, {
        method: 'patch',
        data: params
      })
    } catch (error) {
      console.log(error)
    }
  },
  async deleteComment ({ commit }, commentId) {
    try {
      commit('DELETE_comment', commentId)
      await axios(`/trips/${state.trip._id}/comment`, {
        method: 'patch',
        data: { commentId }
      })
    } catch (error) {
      console.log(error)
    }
  },
  async rateTrip ({ commit }, rating) {
    await axios(`/trips/${state.trip._id}/rate`, {
      method: 'patch',
      data: { rating }
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
