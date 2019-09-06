import axios from '../axios'

export default {
  getPopularSites () {
    return axios.get(`/sites/popular`)
  },
  getSite (siteId) {
    return axios.get(`/sites/${siteId}`)
  },
  collectSite (siteId) {
    return axios.patch(`/sites/${siteId}`)
  }
}
