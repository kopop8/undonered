<template>
  <q-card>
    <q-img :src="src">
      <div class="absolute-bottom">
        <div class="text-h6">{{review.description}}</div>
        <div class="text-subtitle2" v-if="!preview">{{review.User.firstName}} {{review.User.lastName}}</div>
      </div>
    </q-img>
    <q-card-section>
      <div class="row">
     <div class="col-10"> <q-rating readonly size="24px" v-model="review.rating" :max="5"/> </div>
        <div class="col-2" style="float: right"><q-icon class="q-pa-sm" ripple size="24px" name="thumb_up" @click="likeReview" :color="liked ? 'primary' : 'grey-8' "/><span class="q-pa-sm">{{review.totalLikes}}</span></div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  props: ['review', 'preview'],
  name: 'ReviewItem',
  data () {
    return {
    }
  },
  created () {
    // get all your likes from store it if hasnt got them yet.
    if (this.likes.length < 1) {
      this.getLikes()
    }
  },
  computed: {
    src () {
      return this.$axios.defaults.baseURL + this.review.image
    },
    // get the likes from the store
    likes () {
      return this.$store.getters['likes/LIKES']
    },
    // is the review liked by you?
    liked () {
      return this.$store.getters['likes/LIKES'].some(like => like.reviewId === this.review.id)
    }
  },
  methods: {
    getLikes () {
      this.$store.dispatch('likes/getYourLikes')
    },
    likeReview () {
      // this.liked = !this.liked
      // if liked than unlike
      if (this.liked) {
        // delete your like
        this.$axios.delete('/likes/' + this.review.id).then(response => {
          // get all your likes to check if the call was correct
          this.getLikes()
          // -1 point for likes.
          this.review.totalLikes--
        }).catch(err => {
          this.$q.notify({ message: `Couldnt like review: ${err.message}`, color: 'red' })
        })
      } else {
        // likes review
        this.$axios.post('/likes/' + this.review.id).then(response => {
          // get all your likes to check if the call was correct
          this.getLikes()
          // +1 point for likes.
          this.review.totalLikes++
        }).catch(err => {
          this.$q.notify({ message: `Couldnt like review: ${err.message}`, color: 'red' })
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
