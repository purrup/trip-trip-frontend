import axios from '../axios'
import place from '@/assets/place.json'

export default {
  async getPopularSites () {
    const { data } = await axios.get(`/sites/popular`)
    const siteData = data
    const placeData = place.data
    return siteData.map(site => {
      const index = place.data.findIndex(place => site.placeId === place.placeId)
      return Object.assign({}, site, placeData[index])
    })
  },
  getSite (siteId) {
    return axios.get(`/sites/${siteId}`)
  },
  toggleCollectedSites (placeId) {
    return axios.patch(`/sites/${placeId}/collect`)
  }
}
