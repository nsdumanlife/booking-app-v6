<script>
// eslint-disable-next-line no-unused-vars
import { RouterLink } from 'vue-router'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'HeaderCmp',
  data() {
    return {
      backendError: null,
    }
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    ...mapActions(['logout']),
    async doLogout() {
      await this.logout()
    },
  },
}
</script>

<template lang="pug">
header
  RouterLink.logo(to='/')
    img.d-inline-block.align-text-top.logo-icon(
      src='./icons/hut-svgrepo-com.svg',
      alt='Bungaa',
      width='30',
      height='30'
    )
    span Bungaa
  nav
    div(v-if='!user')
      RouterLink(to='/login') Login
      RouterLink(to='/register') Register
    div(v-else)
      RouterLink(to='/bookings') Bookings
      a(@click='doLogout') Logout
</template>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 1rem;
}

header span {
  display: block;
  padding: 0 1rem;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

.logo {
  display: flex;
  justify-content: center;
}

header a.router-link-exact-active {
  color: var(--color-text);
}

header a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
