import Axios from 'axios'

const options = {
  baseURL: process.env.NODE_ENV === 'production'
    ? 'https://triptrip-backend.herokuapp.com:3000'
    : 'http://localhost:3000',
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
  return request
})
instance.interceptors.response.use(response => {
  return response
})

export default instance
