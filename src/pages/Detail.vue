<template>
  <q-page>
    <q-header bordered class="bg-secondary text-white">
      <q-toolbar>
        <q-btn @click="goBack" no-caps color="primary" label="Back"/>
        <q-toolbar-title>
<!--          {{restaurant.title}}-->
        </q-toolbar-title>
<!--        <q-btn @click="goBack" color="primary" label="go to maps"/>-->
      </q-toolbar>
    </q-header>
      <q-pull-to-refresh @refresh="refresh">
        <div class="scroll q-ma-md">
    <restaurant-item detail="true" :restaurant="restaurant"></restaurant-item>
  <div class="q-ma-sm">  <span class="text-h6">Reviews</span>
            <q-btn-dropdown round class="float-right" color="primary" icon="sort">
              <q-list>
                <q-item clickable v-close-popup :class="selectedSort === 'newest' ? 'bg-grey-4':''" @click="setSort('newest')">
                  <q-item-section>
                    <q-item-label>Newest first</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup  :class="selectedSort === 'best' ? 'bg-grey-4':''" @click="setSort('best')">
                  <q-item-section>
                    <q-item-label>Most stars</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup  :class="selectedSort === 'most' ? 'bg-grey-4':''" @click="setSort('most')">
                  <q-item-section>
                    <q-item-label>Most Liked first</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
  </div>
    <q-separator class="q-mb-sm"/>
    <q-list>
      <div class="q-ma-sm" :key="index" v-for="(review, index) in sortedReview">
        <review-item :review="review"></review-item>
      </div>
      <div v-if="reviews.length === 0 ">
        <q-card><q-card-section>No reviews yet</q-card-section></q-card>
      </div>
    </q-list>
        </div>
      </q-pull-to-refresh>
  </q-page>
</template>

<script>
import RestaurantItem from '../components/RestaurantItem'
import ReviewItem from '../components/ReviewItem'

export default {
  components: { RestaurantItem, ReviewItem },
  props: ['restaurant'],
  name: 'PageDetail',
  created () {
    // first check if a restaurant prop was given
    if (!this.restaurant) {
      this.$router.push('/')
    } else {
      // get all your likes from store it if hasnt got them yet.
      if (this.likes.length < 1) {
        this.getLikes()
      }
      // get all reviews of this restaurant
      this.getReviews()
    }
  },
  data () {
    return {
      reviews: [],
      selectedSort: 'newest'
    }
  },
  computed: {
    likes () {
      return this.$store.getters['likes/LIKES']
    },
    // sorts review on selectedSort
    sortedReview () {
      let reviews = this.reviews
      return reviews.sort((a, b) => {
        if (this.selectedSort === 'most') {
          // sort on most likes
          if (a.totalLikes > b.totalLikes) {
            return -1
          } else {
            return 1
          }
        } else if (this.selectedSort === 'best') {
          // sort on best rating
          if (a.rating > b.rating) {
            return -1
          } else {
            return 1
          }
        } else {
          return 0
        }
      })
    }
  },
  methods: {
    setSort (sort) {
      this.selectedSort = sort
    },
    getLikes () {
      this.$store.dispatch('likes/getYourLikes')
    },
    getReviews () {
      this.$axios.get('/reviews/' + this.restaurant.id).then(response => {
        this.reviews = response.data
      }).catch(err => {
        this.$q.notify({ message: `Err getting reviews: ${err}`, color: 'red' })
      })
    },
    // pull to refresh
    refresh (done) {
      setTimeout(() => {
        this.getReviews()
        done()
      }, 1000)
    },
    goBack () {
      this.$router.back()
    },
    logout () {
      this.$store.dispatch('profile/logout')
      this.$router.push('/login')
    }
  }
}
</script>
