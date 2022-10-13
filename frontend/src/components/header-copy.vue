<script>
// eslint-disable-next-line no-unused-vars
import { RouterLink } from 'vue-router'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'HeaderCmpCopy',
  data() {
    return {
      backendError: null,
    }
  },
  computed: {
    ...mapState(['user', 'location', 'checkInDate', 'checkOutDate', 'guest', 'isSearchBarVisible']),
    showGuestNumber() {
      if (!this.guest) return 'Add guest'
      if (this.guest === 1) return '1 guest'
      return `${this.guest} guests`
    },
    showLocation() {
      if (!this.location) return 'Select location'
      return `${this.location}`
    },
  },
  methods: {
    ...mapActions(['logout', 'setIsSearchBarVisible']),
    async doLogout() {
      await this.logout()
    },
    changeSearchBarVisible() {
      const searchBarVisible = !this.IsSearchBarVisible

      this.$store.dispatch('setIsSearchBarVisible', searchBarVisible)
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
    .search-container.green(@click='changeSearchBarVisible')
      .place {{ showLocation }}
      .checkInDate {{ checkInDate }}
      .checkOutDate {{ checkOutDate }}
      .guest {{ showGuestNumber }}
    .nav-list
      div(v-if='!user')
        RouterLink(to='/login') Login
        RouterLink(to='/register') Register
      div(v-else)
        RouterLink(to='/bookings') Bookings
        a(@click='doLogout') Logout
    .menu
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

.search-container {
  cursor: pointer;
  /* display: grid;
  grid-template-columns: 25% 25% 25% 25%; */
  border: 1px solid rgb(88, 249, 158);
  border-radius: 0.3rem;
  gap: 5rem;
}

.menu {
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
  .menu {
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
    margin-top: 4rem;
    text-align: center;
    display: none;
  }
}
</style>
