import Vue from 'vue'
import axios from 'axios'
import router from '../router'

// Check env and set base url
if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'http://85.144.7.206:3000'
} else if (process.env.NODE_ENV === 'development') {
  // axios.defaults.baseURL = 'http://85.144.7.206:3000'
  axios.defaults.baseURL = 'http://localhost:3000'
} else if (process.env.NODE_ENV === 'mobile') {
  axios.defaults.baseURL = 'http://85.144.7.206:3000'
}

// Add a token to each call if it has one
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token')
  config.headers.Authorization = `Bearer ${token}`
  return config
})

// Check axios calls for a 401 (unAuth). if so go to login
axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  // if a call fails with a 401 remove the token and logout
  if (error && error.response && error.response.status && error.response.status === 401) {
    localStorage.removeItem('token')
    router.push('/login')
  }
  return Promise.reject(error)
})
Vue.prototype.$axios = axios
