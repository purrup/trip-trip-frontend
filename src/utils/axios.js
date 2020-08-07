import Axios from 'axios'

const options = {
  // baseURL: process.env.NODE_ENV === 'production'
  //   ? 'https://trip-trip-backend.herokuapp.com'
  //   : 'http://localhost:3000',
  baseURL: 'https://trip-trip-backend.herokuapp.com',
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
