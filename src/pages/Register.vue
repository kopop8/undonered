<template>
  <div class="q-ma-lg">
    <q-card>
      <q-card-section>
        <span class="text-h4 text-primary">Register Account</span>
      </q-card-section>
      <q-separator inset/>
      <q-card-section>
        <q-input stack-label label="Email" data-cy="email" placeholder="DonerEater69@kip.nl"  ref="email" :rules="[ val => val.length > 0 || 'Required field']" filled v-model="email"></q-input>
      </q-card-section>
      <q-card-section>
        <q-item class="q-ma-none"> <q-item-section>  <q-input stack-label label="Firstname" data-cy="firstname"  ref="firstName" :rules="[ val => val.length > 0 || 'Required field']" placeholder="Johan"  filled v-model="firstName"></q-input></q-item-section> <q-item-section> <q-input data-cy="lastname" :rules="[ val => val.length > 0 || 'Required field']"  ref="lastName" stack-label label="Lastname" placeholder="Zeil"  filled v-model="lastName"></q-input></q-item-section></q-item>
      </q-card-section>
      <q-card-section>
        <q-input stack-label label="Password" data-cy="password"   ref="password"  :rules="[ val => val.length > 0 || 'Required field']" filled v-model="password" :type="isPwd ? 'password' : 'text'"
                 placeholder="****">
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
      <q-card-section>
        <q-input stack-label   ref="passwordRepeat"  data-cy="passwordrepeat"   :rules="[ val => val.length > 0 || 'Required field']" label="Repeat password" v-model="passwordRepeat" :error="passwordRepeatErr.length > 0" :error-message="passwordRepeatErr" filled :type="isPwd2 ? 'password' : 'text'"
                 placeholder="****">
          <template v-slot:append>
            <q-icon
              v-if="passwordRepeat.length > 0"
              :name="isPwd2 ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd2 = !isPwd2"
            />
          </template>
        </q-input>
      </q-card-section>
      <q-card-actions align="around">
        <q-btn color="secondary" data-cy="login" no-caps label="go to Login" @click="goTo('login')"/>
        <q-btn color="primary" data-cy="register" no-caps  label="Register" @click="register"/>
<!--        <q-btn label="Submit" type="submit" color="primary" />-->
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>

export default {
  name: 'PageRegister',
  data () {
    return {
      email: '',
      isPwd: true,
      isPwd2: true,
      password: '',
      passwordRepeat: '',
      passwordRepeatErr: '',
      firstName: '',
      lastName: '',
      loading: false
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
      this.$refs.passwordRepeat.validate()
      this.$refs.firstName.validate()
      this.$refs.lastName.validate()
      if (this.$refs.email.hasError || this.$refs.password.hasError || this.$refs.passwordRepeat.hasError || this.$refs.firstName.hasError || this.$refs.lastName.hasError) {
        gotError = true
      }
      // password and password repeat must be the same
      if (this.passwordRepeat !== this.password) {
        this.passwordRepeatErr = 'Passwords dont match'
        gotError = true
      } else {
        this.passwordRepeatErr = ''
      }
      return gotError
    },
    // register function
    register () {
      this.loading = true
      const account = {
        password: this.password,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName
      }
      // cant register if the inputs contain errors
      if (!this.hasErrors()) {
        this.$store.dispatch('account/register', account).then(response => {
          this.loading = false
          // if successful go to main page
          this.$router.push('/')
        }).catch(err => {
          // console.log(err)
          this.loading = false
          this.$q.notify(err.message)
        })
      } else {
        this.loading = false
      }
    }
  }
}
</script>
