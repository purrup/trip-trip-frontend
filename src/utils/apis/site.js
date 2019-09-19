import axios from '../axios'
import place from '@/assets/place.json'

export default {
  async getPopularSites () {
    const { data } = await axios.get(`/sites/popular`)
    return mergeSites(data)
  },
  async getSite (siteId) {
    const { data } = await axios.get(`/sites/${siteId}`)
    return mergeSite(data)
  },
  toggleCollectedSites (placeId) {
    return axios.patch(`/sites/${placeId}/collect`)
  },
  async getSitesByCountryAndCities (city) {
    const { data } = await axios.get(`/sites/?country=台灣&cities[]=${city}`)
    return mergeSites(data)
  },
  async getSitesByKeyword (keyword) {
    const { data } = await axios.get(`/sites/search/?keyword=${keyword}`)
    return mergeSites(data)
  }
}

function mergeSites (data) {
  const sites = data
  const placeData = place.data
  return sites.map(site => {
    const index = placeData.findIndex(place => site.placeId === place.placeId)
    return Object.assign({}, site, placeData[index])
  })
}

function mergeSite (data) {
  const { site, trips } = data
  const placeData = place.data
  const index = placeData.findIndex(place => site.placeId === place.placeId)
  return {
    site: Object.assign({}, site, placeData[index]),
    trips
  }
}
