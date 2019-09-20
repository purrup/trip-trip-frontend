import axios from '../axios'

export default {
  getUser (userId) {
    return axios.get(`/users/${userId}`)
  },
  getUserProfile (userId) {
    return axios.get(`/users/${userId}/profile`)
  }
}
