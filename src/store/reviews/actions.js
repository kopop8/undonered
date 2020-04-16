import axios from 'axios'

// get all your reviews
export function getYourReviews ({ commit }) {
  return new Promise((resolve, reject) => {
    axios.get('/reviews/user').then(response => {
      commit('setReviews', response.data)
      resolve(response.data)
    }).catch(err => {
      reject(err)
    })
  })
}
