import axios from 'axios'

// save token in local storage and add it to each call made with axios
export function setToken (state, token) {
  localStorage.setItem('token', token)
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  state.token = token
}
export function setAccount (state, account) {
  state.account = account
}

// delete account info
export function logOut (state) {
  localStorage.removeItem('token')
  state.account = null
  state.token = null
}

export function setTag (state, tag) {
  state.tag = tag
}
export function setRadius (state, radius) {
  state.radius = radius
}
