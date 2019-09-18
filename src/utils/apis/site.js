import axios from '../axios'
import place from '@/assets/place.json'

export default {
  async getPopularSites () {
    const { data } = await axios.get(`/sites/popular`)
    const sites = data
    const placeData = place.data
    return sites.map(site => {
      const index = placeData.findIndex(place => site.placeId === place.placeId)
      return Object.assign({}, site, placeData[index])
    })
  },
  async getSite (siteId) {
    const { data } = await axios.get(`/sites/${siteId}`)
    const { site, trips } = data
    const placeData = place.data
    const index = placeData.findIndex(place => site.placeId === place.placeId)
    return {
      site: Object.assign({}, site, placeData[index]),
      trips
    }
  },
  toggleCollectedSites (placeId) {
    return axios.patch(`/sites/${placeId}/collect`)
  }
}
