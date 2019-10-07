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
  },
  isOnEditMode: false
}

const getters = {
  getIsOnEditMode (state) {
    return state.isOnEditMode
  }
}

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
  },
  TOGGLE_isOnEditMode (state) {
    state.isOnEditMode = !state.isOnEditMode
  },
  CHANGE_IMAGES_OF_OVERVIEW (state, data) {
    data.forEach(previewImage => {
      state.trip.images.push(previewImage)
    })
  },
  UPDATE_TRIP_NAME (state, data) {
    state.trip.name = data
  },
  UPDATE_TRIP_startDate (state, data) {
    if (!state.trip.startDate) {
      state.trip['startDate'] = data
    } else {
      state.trip.startDate = data
    }
  },
  UPDATE_TRIP_privacy (state, data) {
    state.trip.isPrivate = data
  },
  UPDATE_TRIP_journal (state, data) {
    state.trip.journal = data
  },
  ADD_TRIP_date (state) {
    state.trip.days += 1
    state.trip.contents.push({
      activities: [],
      note: ''
    })
  },
  DELETE_TRIP_date (state, currentDate) {
    state.trip.days -= 1
    state.trip.contents.splice(currentDate, 1)
  },
  ADD_TRIP_activity (state, { newActivity, currentDate }) {
    state.trip.contents[currentDate].activities.push(newActivity)
  },
  DELETE_TRIP_activity (state, { deletedActivity, currentDate }) {
    const deletedIndex = state.trip.contents[currentDate].activities.indexOf(deletedActivity)
    state.trip.contents[currentDate].activities.splice(deletedIndex, 1)
  },
  UPDATE_TRIP_note (state, { note, currentDate }) {
    state.trip.contents[currentDate].note = note
  },
  UPDATE_TRIP_activity (state, { data, currentDate, activity }) {
    const updatedIndex = state.trip.contents[currentDate].activities.indexOf(activity)
    state.trip.contents[currentDate].activities[updatedIndex] = data
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
      router.push({ path: `/trips/${data._id}` })
    } catch (error) {
      console.log(error)
    }
  },
  async addComment ({ commit }, { tripId, text }) {
    try {
      const { data } = await axios(`/trips/${tripId}/comment`, {
        method: 'patch',
        data: { text }
      })
      return data
    } catch (error) {
      console.log(error)
    }
  },
  async reviseComment ({ commit }, { tripId, text, commentId }) {
    try {
      await axios(`/trips/${tripId}/comment`, {
        method: 'patch',
        data: { text, commentId }
      })
    } catch (error) {
      console.log(error)
    }
  },
  async deleteComment ({ commit }, { tripId, commentId }) {
    try {
      await axios(`/trips/${tripId}/comment`, {
        method: 'patch',
        data: { commentId }
      })
    } catch (error) {
      console.log(error)
    }
  },
  async rateTrip ({ commit }, { tripId, rating }) {
    try {
      await axios(`/trips/${tripId}/rate`, {
        method: 'patch',
        data: { rating }
      })
    } catch (error) {
      console.log(error)
    }
  },
  async updateTrip ({ commit }, { tripId, formData }) {
    try {
      await axios(`/trips/${tripId}`, {
        method: 'patch',
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 0,
        data: formData
      })
    } catch (error) {
      console.log(error)
    }
  },
  async deleteTrip  (context, id) {
    try {
      await axios.delete(`/trips/${id}`)
      console.log('deleted')
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
