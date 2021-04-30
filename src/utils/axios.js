import Axios from 'axios'

Axios.defaults.headers.common = { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
// cors setting
const options = {
  baseURL: process.env.NODE_ENV === 'production'
    ? 'https://trip-trip.herokuapp.com/'
    : 'http://localhost:3000/',
  // baseURL: 'https://trip-trip.herokuapp.com/',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
}

const instance = Axios.create(options)
// config axios timeout
instance.defaults.timeout = 5000
/* config interceptors */
instance.interceptors.request.use(request => {
  request.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
  return request
})
instance.interceptors.response.use(response => {
  return response
})

export default instance
