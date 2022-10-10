<script>
// eslint-disable-next-line no-unused-vars
import { RouterLink } from 'vue-router'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'HeaderCmp',
  data() {
    return {
      backendError: null,
      navOpen: false,
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
  nav
    RouterLink.logo(to='/')
      img.d-inline-block.align-text-top.logo-icon(
        src='./icons/hut-svgrepo-com.svg',
        alt='Bungaa',
        width='30',
        height='24'
      )
      span.green Bungaa
    .nav-list(:class='{ active: navOpen }')
      div(v-if='!user')
        RouterLink(to='/login') Login
        RouterLink(to='/register') Register
      div(v-else)
        RouterLink(to='/bookings') Bookings
        a(@click='doLogout') Logout
    .hamburger-menu(@click='navOpen = !navOpen')
      .menu-line
      .menu-line
      .menu-line
</template>

<style scoped>
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin: 0.5rem;
}

.logo {
  display: flex;
  justify-content: center;
}

.logo span {
  display: block;
  padding: 0 1rem;
  transition: 0.4s;
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

.hamburger-menu {
  display: none;
}

.menu-line {
  width: 20px;
  height: 3px;
  background-color: var(--color-text);
  margin-bottom: 4px;
}

@media all and (max-width: 480px) {
  nav {
    display: flex;
    flex-direction: column;
    margin-bottom: 8vh;
    justify-content: flex-start;
  }
  .hamburger-menu {
    display: block;
    position: absolute;
    right: 15px;
    top: 15px;
  }
  .logo {
    /* display: inline-block;
    position: absolute;
    left: 15px; */
    display: flex;
    justify-content: flex-start;
  }

  nav a {
    display: block;
    padding: 1rem;
    border-top: 1px solid var(--color-border);
    border-left: 0;
  }

  .nav-list {
    width: 100%;
    margin-top: 3rem;
    text-align: center;
    display: none;
  }

  .active {
    display: block;
  }
}
</style>
