<script>
import { mapActions } from 'vuex'

export default {
  name: 'register',
  data() {
    return {
      firstName: '',
      lastName: '',
      age: null,
      email: '',
      password: '',
      backendError: null,
    }
  },
  methods: {
    ...mapActions(['register']),
    async submitRegister() {
      try {
        await this.register({
          firstName: this.firstName,
          lastName: this.lastName,
          age: this.age,
          email: this.email,
          password: this.password,
        })

        this.$router.push('/login')
      } catch (e) {
        this.backendError = e.response.data.message
      }
    },
  },
}
</script>

<template lang="pug">
.register
  form(@submit.prevent='submitRegister')
    h1 Create a new account
    label(for='firstName') First Name:&nbsp;
      input(v-model='firstName' id='firstName' type='text' placeholder='Enter your first name' required)
    label(for='lastName') Last Name:&nbsp;
      input(v-model='lastName' id='lastName' type='text' placeholder='Enter your last name' required)
    label(for='age') Age:&nbsp;
      input(v-model='age' id='age' type='number' placeholder='Enter your age' required)
    label(for='email') Email:&nbsp;
      input(v-model='email' id='email' type='text' placeholder='Enter your email' required)
    label(for='password') Password:&nbsp;
      input(v-model='password' id='password' type='password' placeholder='Enter your password' required)
    input(type='submit' value='Register')
  div(v-if='backendError') {{ backendError }}
  div Already have an account? <router-link to="/login">Log  in</router-link>

</template>

<style lang="scss" scoped>
label {
  display: block;
  margin: 1rem 0;
}
</style>
