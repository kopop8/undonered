<template>
  <q-page >
    <q-header bordered class="bg-secondary text-white">
      <q-toolbar>
        <q-toolbar-title class="text-center">
          Undönered
        </q-toolbar-title>
      </q-toolbar>
      <q-tabs v-model="tag">
        <q-tab name="nearby" data-cy="nearby" label="Nearby"/>
        <q-tab name="all" data-cy="all" label="All"/>
      </q-tabs>
    </q-header>
      <q-pull-to-refresh @refresh="refresh">
    <q-list class="scroll q-ml-md q-mr-md" >
      <q-input float-label label="search" v-model="searchInput" data-cy="search-input" bg-color="white" class="q-mt-sm" dense rounded outlined>
        <template v-slot:append>
          <q-icon name="search"></q-icon>
        </template>
      </q-input>

      <q-slider
                v-if="tag === 'nearby'"
                v-model="radius"
                :min="0"
                :max="15"
                data-cy="radius"
                :step="1"
                label label-always
                :label-value="radius + ' km'"
                color="primary"
      />

          <q-btn-dropdown round color="primary" data-cy="sort" icon="sort">
            <q-list>
              <q-item clickable v-close-popup data-cy="sort-closest" :class="selectedSort === 'closest' ? 'bg-grey-4':''" @click="setSort('closest')">
                <q-item-section>
                  <q-item-label>Closest first</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup data-cy="sort-best"  :class="selectedSort === 'best' ? 'bg-grey-4':''" @click="setSort('best')">
                <q-item-section>
                  <q-item-label>Best first</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup data-cy="sort-most"  :class="selectedSort === 'most' ? 'bg-grey-4':''" @click="setSort('most')">
                <q-item-section>
                  <q-item-label>Most reviewed first</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
    <div :key="index" v-for="(restaurant, index) in filteredRestaurants" class="q-mt-sm">
      <div @click="goTo('/detail', restaurant)">
        <restaurant-item :data-cy="'restaurant:'+index" :restaurant="restaurant"></restaurant-item>
      </div>
    </div>
    <div v-if="filteredRestaurants.length === 0 && !loading"><q-card><q-card-section data-cy="empty-restaurants">Nothing found with your parameters</q-card-section></q-card></div>
    </q-list>
      </q-pull-to-refresh>
    <q-dialog v-if="review" v-model="dialogOpened">
      <q-card style="min-width: 80vw; width: 80vw">
        <q-card-section><span class="text-h6">Review posted!</span></q-card-section>
<!--        <q-card-section><span>{{review.restaurant.title}}</span></q-card-section>-->
        <q-separator inset/>
        <q-card-section>
          <review-item :preview="true" :review="review"></review-item>
        </q-card-section>
        <q-card-section><b>Badges Earned:</b>
          <q-separator/>
          Coming soon
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import RestaurantItem from '../components/RestaurantItem'
import ReviewItem from '../components/ReviewItem'

export default {
  name: 'PageIndex',
  props: ['review'],
  components: { RestaurantItem, ReviewItem },
  created () {
    // get location of gps and ask permission
    this.getLocation().then(response => {
      this.getRestaurants()
    }).catch(err => {
      this.$q.notify({ message: `Error occured : getting location : ${err}`, color: 'red' })
      this.tag = 'all'
    })
  },
  computed: {
    // get saved option of tag (standard = nearby)
    tag: {
      get: function () {
        return this.$store.getters['account/TAG']
      },
      set: function (newValue) {
        this.$store.dispatch('account/setTag', newValue)
      }
    },
    // get saved option of radius (standard = 2)
    radius: {
      get: function () {
        return this.$store.getters['account/RADIUS']
      },
      set: function (newValue) {
        // console.log(newValue)
        if (newValue === 0) {
          newValue = 1
        }
        this.$store.dispatch('account/setRadius', newValue)
        this.getRestaurants()
      }
    },
    // get all restaurants saved in store
    restaurants () {
      let restaurants = JSON.parse(JSON.stringify(this.$store.getters['restaurants/RESTAURANTS']))
      // return sorted list of restaurants
      if (this.selectedSort === 'best') {
        return restaurants.sort((a, b) => {
          // a or b can have no rating yet
          if (!a.rating) {
            if (b.rating && b.rating.average) {
              return 1
            } else {
              return 0
            }
          }
          if (!b.rating) {
            if (a.rating && a.rating.average) {
              return -1
            } else {
              return 0
            }
          }
          // sort by highest rating
          if (a.rating.average > b.rating.average) {
            return -1
          } else {
            return 1
          }
        })
      } else if (this.selectedSort === 'most') {
        return restaurants.sort((a, b) => {
          // a or b can have no rating yet
          if (!a.rating) {
            if (b.rating && b.rating.total) {
              return 1
            } else {
              return 0
            }
          }
          if (!b.rating) {
            if (a.rating && a.rating.total) {
              return -1
            } else {
              return 0
            }
          }
          // sort by number of ratings
          if (a.rating.total > b.rating.total) {
            return -1
          } else {
            return 1
          }
        })
      } else if (this.selectedSort === 'closest') {
        return restaurants.sort((a, b) => {
          // sort by distance
          if (a.distance > b.distance) {
            return 1
          } else {
            return -1
          }
        })
      } else {
        return this.$store.getters['restaurants/RESTAURANTS']
      }
    },
    // filtered restuarant with search input
    filteredRestaurants () {
      if (this.restaurants) {
        return this.restaurants.filter(restaurant => {
          return restaurant.title.toLowerCase().indexOf(this.searchInput.toLowerCase()) > -1
        })
      } else {
        return []
      }
    }
  },
  watch: {
    // get restaurants if tag changes
    tag () {
      // console.log('changing tag', this.tag)
      if (this.tag === 'nearby') {
        this.getRestaurants()
      } else {
        // console.log('getting restaurants nearby')
        this.getRestaurantsBoundingBox()
      }
    }
  },
  data () {
    return {
      lat: 0,
      long: 0,
      selectedSort: 'best',
      items: [{}, {}, {}, {}, {}, {}, {}, {}, {}],
      loading: false,
      dialogOpened: true,
      searchInput: ''
    }
  },
  methods: {
    setSort (sort) {
      this.selectedSort = sort
    },
    // pull to refresh function
    refresh (done) {
      setTimeout(() => {
        if (this.tag === 'nearby') {
          this.getRestaurants()
        } else {
          // console.log('getting restaurants nearby')
          this.getRestaurantsBoundingBox()
        }
        done()
      }, 1000)
    },
    async getRestaurants () {
      if (this.lat !== 0 && this.long !== 0) {
        let options = {
          lat: this.lat,
          long: this.long,
          radius: this.radius * 1000
        }
        await this.$store.dispatch('restaurants/getRestaurants', options)
      }
    },
    async getRestaurantsBoundingBox () {
      // console.log('getting rest with bounding box')
      await this.$store.dispatch('restaurants/getRestaurantsBoundingBox')
    },
    getLocation () {
      return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            this.lat = position.coords.latitude
            this.long = position.coords.longitude
            resolve(position)
          }, (err) => {
            // console.error('err', err)
            reject(err)
          })
        } else {
          this.$q.notify({ message: 'No access to gps, give access in settings and restart app', color: 'red' })
          reject()
        }
      })
    },
    goTo (route, restaurant) {
      this.$router.push({ name: 'detail', params: { restaurant: restaurant } })
    }
  }
}
</script>
