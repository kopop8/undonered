import axios from 'axios'

// login call and save account
export function login ({ commit }, account) {
  return new Promise((resolve, reject) => {
    const url = '/user/login'
    const body = { email: account.email, password: account.password }
    axios.post(url, body).then(response => {
      commit('setToken', response.data.jwt)
      commit('setAccount', response.data.user)
      resolve(response)
    }).catch(err => {
      reject(err)
    })
  })
}
// register call and save account
export function register ({ commit }, account) {
  return new Promise((resolve, reject) => {
    const url = '/user/register'
    const body = { email: account.email, password: account.password, firstName: account.firstName, lastName: account.lastName }
    axios.post(url, body).then(response => {
      commit('setToken', response.data.jwt)
      commit('setAccount', response.data.user)
      resolve(response)
    }).catch(err => {
      reject(err)
    })
  })
}
// set tag
export function setTag ({ commit }, tag) {
  commit('setTag', tag)
}
// set radius
export function setRadius ({ commit }, radius) {
  commit('setRadius', radius)
}
// put info and save it
export function changeInfo ({ commit }, account) {
  return new Promise((resolve, reject) => {
    const url = '/user'
    const body = { firstName: account.firstName, lastName: account.lastName }
    axios.put(url, body).then(response => {
      commit('setAccount', response.data)
      resolve(response)
    }).catch(err => {
      reject(err)
    })
  })
}

export function logOut ({ commit }) {
  commit('logOut')
}
