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
    .form-input
      label(for='firstName') First Name:&nbsp;
      input#firstName(v-model='firstName', type='text', placeholder='Enter your first name', required)
    .form-input
      label(for='lastName') Last Name:&nbsp;
      input#lastName(v-model='lastName', type='text', placeholder='Enter your last name', required)
    .form-input
      label(for='age') Age:&nbsp;
      input#age(v-model='age', type='number', placeholder='Enter your age', required)
    .form-input
      label(for='email') Email:&nbsp;
      input#email(v-model='email', type='text', placeholder='Enter your email', required)
    .form-input
      label(for='password') Password:&nbsp;
      input#password(v-model='password', type='password', placeholder='Enter your password', required)
    input(type='submit', value='Register')
  div(v-if='backendError') {{ backendError }}
  .login Already have an account? <router-link to="/login">Log in</router-link>
</template>

<style lang="scss" scoped>
.register {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .form-input {
      display: flex;
      justify-content: space-between;
    }
  }

  .login {
    margin-top: 0.5rem;
  }
}
</style>
