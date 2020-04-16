<template>
  <div class="q-ma-lg">
    <q-btn color="primary" data-cy="back" class="q-mb-sm" no-caps label="Back" @click="goTo('register')"/>
    <q-card>
      <q-card-section>
        <span class="text-h4 text-primary">Login</span>
      </q-card-section>
      <q-separator inset/>
      <q-card-section>
        <q-input float-label label="Username" placeholder="Test123" filled v-model="email"  :rules="[ val => val.length > 0 || 'Required field']" data-cy="email" type="text" ref="email"></q-input>
      </q-card-section>
      <q-card-section>
        <q-input float-label label="Password" v-model="password" data-cy="password" filled :type="isPwd ? 'password' : 'text'"
                 placeholder="****"  :rules="[ val => val.length > 0 || 'Required field']" ref="password" >
          <template v-slot:append>
            <q-icon
              v-if="password.length > 0"
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </q-card-section>
      <q-card-actions align="around">

        <q-btn color="primary" data-cy="login" no-caps label="Login" @click="login"/>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'PageLogin',
  data () {
    return {
      email: '',
      isPwd: true,
      password: ''
    }
  },
  watch: {
  },
  methods: {
    goTo (route) {
      this.$router.push(route)
    },
    // check / validate for errors (causing the input to go red and display errors)
    hasErrors () {
      let gotError = false
      this.$refs.email.validate()
      this.$refs.password.validate()
      if (this.$refs.email.hasError || this.$refs.password.hasError) {
        gotError = true
      }
      return gotError
    },
    // login
    login () {
      const account = {
        password: this.password,
        email: this.email
      }
      // only try and login if there are no errors
      if (!this.hasErrors()) {
        this.$store.dispatch('account/login', account).then(response => {
          this.$router.push('/')
        }).catch(err => {
          this.$q.notify(err.message)
        })
      }
    }
  }
}
</script>
