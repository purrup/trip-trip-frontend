import axios from '../axios'
import { mergeSites } from '@/utils/apis/site.js'

export default {
  getUser () {
    return axios.get(`/admin/users`)
  },
  async getSites () {
    const { data } = await axios.get(`/admin/sites`)
    return mergeSites(data)
  },
  deleteUser (userId) {
    return axios.delete(`/admin/users/${userId}`)
  },
  deleteSite (placeId) {
    return axios.delete(`/admin/sites/${placeId}`)
  }
}
