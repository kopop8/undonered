import axios from 'axios'

// set restaurants
export function setRestaurants ({ commit }, restaurants) {
  commit('setRestaurants', restaurants)
}

// get restaurants with given options
export function getRestaurants ({ commit }, options) {
  return new Promise((resolve, reject) => {
    const url = `/restaurants?in=${options.lat},${options.long};r=${options.radius}`
    axios.get(url).then(response => {
      commit('setRestaurants', response.data)
      resolve(response)
    }).catch(err => {
      reject(err)
    })
  })
}

// get and set restaurants with bounding box of the netherlands
export function getRestaurantsBoundingBox ({ commit }) {
  return new Promise((resolve, reject) => {
    const url = `/restaurants?in=3.31497114423,50.803721015,7.09205325687,53.5104033474`
    axios.get(url).then(response => {
      commit('setRestaurants', response.data)
      resolve(response)
    }).catch(err => {
      reject(err)
    })
  })
}
