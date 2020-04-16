<template>
  <q-page class="q-ma-lg">
    <q-header bordered class="bg-secondary text-white">
      <q-toolbar>
        <q-toolbar-title class="text-center">
          Profile
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <div class="full-width">
      <q-btn round @click="change = !change" :class="change ? 'bg-primary' : 'bg-secondary'"
             class="float-right text-white" icon="build" data-cy="change-info"></q-btn>
      <q-avatar style="width: 150px; height: 150px;  display: block;
  margin-left: auto;
  margin-right: auto;
 " class="q-ma-md">
        <img src="https://cdn.quasar.dev/img/avatar.png">
      </q-avatar>

    </div>
    <q-card>
      <q-card-section><b>Profile</b></q-card-section>
      <q-separator inset/>
      <q-card-section>
        <q-item>
          <q-item-section avatar>
            <q-icon name="person"/>
          </q-item-section>
          <q-item-section>
            <q-input :disable="!change" data-cy="profile-firstname" v-model="firstName"  ref="firstName" :rules="[ val => val.length > 0 || 'Required field']"></q-input>
          </q-item-section>
          <q-item-section>
            <q-input :disable="!change" v-model="lastName" data-cy="profile-lastname" ref="lastName" :rules="[ val => val.length > 0 || 'Required field']"></q-input>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-section>
        <q-item>
          <q-item-section avatar>
            <q-icon name="email"/>
          </q-item-section>
          <q-item-section>
            <q-input disable v-model="email"></q-input>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-actions align="around">
        <q-btn v-if="!change" data-cy="logout" label="logout" no-caps color="primary" @click="logout"/>
        <q-btn v-if="change" color="primary" data-cy="discard" no-caps label="Don't save" @click="discardChanges"></q-btn>
        <q-btn v-if="change" no-caps label="Save" data-cy="save" @click="changeInfo"></q-btn>
      </q-card-actions>
    </q-card>
    <q-card class="q-mt-md">
      <q-card-section><b>Badges</b> (Coming soon)</q-card-section>
      <q-separator inset/>
      <q-card-section>
        <div class="row">
          <div :key="index" v-for="(badge, index) in badges">
            <badge-item :badge="badge"></badge-item>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-card class="q-mt-md q-mb-sm">
      <q-card-section><b>Your reviews</b></q-card-section>
      <q-separator inset/>
    </q-card>
    <div class="q-mb-sm" :key="index" v-for="(review, index) in reviews">
      <review-item :review="review"></review-item>
    </div>
  </q-page>
</template>

<script>
import BadgeItem from '../components/BadgeItem'
import ReviewItem from '../components/ReviewItem'

export default {
  name: 'PageProfile',
  components: { ReviewItem, BadgeItem },
  data () {
    return {
      change: false,
      badges: [{}, {}, {}, {}, {}],
      // dont make this computed because we dont want this to reactive
      firstName: this.$store.getters['account/ACCOUNT'].firstName,
      lastName: this.$store.getters['account/ACCOUNT'].lastName,
      email: this.$store.getters['account/ACCOUNT'].email
    }
  },
  computed: {
    reviews () {
      return this.$store.getters['reviews/REVIEWS']
    },
    likes () {
      return this.$store.getters['reviews/LIKES']
    }
  },
  created () {
    // get all your reviews and likes
    this.getAllReviews()
    if (this.likes.length < 1) {
      this.getLikes()
    }
  },
  methods: {
    getLikes () {
      this.$store.dispatch('likes/getYourLikes')
    },
    getAllReviews () {
      this.$store.dispatch('reviews/getYourReviews')
    },
    logout () {
      this.$store.dispatch('account/logOut')
      this.$router.push('/login')
    },
    // dont save changes and reset firstname and lastname
    discardChanges () {
      this.change = false
      this.firstName = this.$store.getters['account/ACCOUNT'].firstName
      this.lastName = this.$store.getters['account/ACCOUNT'].lastName
    },
    // change info
    changeInfo () {
      // firstname or lastname cant be null
      this.$refs.firstName.validate()
      this.$refs.lastName.validate()
      if (!this.$refs.firstName.hasError && !this.$refs.lastName.hasError) {
        const account = { firstName: this.firstName, lastName: this.lastName }
        this.$store.dispatch('account/changeInfo', account).then(response => {
          this.change = false
          this.$q.notify({ message: 'Change data successful', color: 'green' })
        })
      }
    }
  }
}
</script>
