import axios from 'axios'

// get and set all your likes
export function getYourLikes ({ commit }) {
  return new Promise((resolve, reject) => {
    axios.get('/likes').then(response => {
      commit('setLikes', response.data)
      resolve(response.data)
    }).catch(err => {
      reject(err)
    })
  })
}
