<script>
import { mapActions } from 'vuex'

export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
      backendError: null,
    }
  },
  methods: {
    ...mapActions(['login']),
    async submitLogin() {
      try {
        await this.login({
          email: this.email,
          password: this.password,
        })

        this.$router.push('/')
      } catch (e) {
        this.backendError = e.response.data.message
      }
    },
  },
}
</script>

<template lang="pug">
.login
  form(@submit.prevent='submitLogin')
    h1 Sign in
    .form-input
      label(for='email') Email:&nbsp;
      input#email(v-model='email', type='email', placeholder='Enter your email', required)
    .form-input
      label(for='password') Password:&nbsp;
      input#password(v-model='password', type='password', placeholder='Enter your password', required)
    input.login-btn(type='submit', value='Log in')
  div(v-if='backendError') {{ backendError }}
  .register Don't have an account yet? <router-link to='/register'>Register</router-link>
</template>

<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    width: 27vw;

    .form-input {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }

    .login-btn {
      align-self: flex-end;
      padding: 0 1rem;
    }
  }

  .register {
    margin-top: 0.5rem;
  }
}

@media all and (max-width: 980px) {
  .form-input {
    flex-direction: column;
  }
}
</style>
