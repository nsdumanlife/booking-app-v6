<script>
// eslint-disable-next-line no-unused-vars
import { RouterLink } from 'vue-router'
import { mapActions, mapState } from 'vuex'
import SearchDetail from '@/components/search-detail.vue'
import SearchBar from '@/components/search-bar.vue'

export default {
  name: 'HeaderCmpCopy',
  components: { SearchDetail, SearchBar },
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
      if (!this.location) return 'Anywhere'
      return `${this.location}`
    },
    showCheckInDate() {
      if (!this.checkInDate) return 'Anytime'
      return `${this.checkInDate.slice(-5)} / ${this.checkOutDate.slice(-5)}`
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
        src='./icons/logo-monochrome-black.svg',
        alt='Bungaa Logo',
        width='70'
      )
    //- SearchBar.search-container
    .search-container.green(@click='changeSearchBarVisible')
      .place {{ showLocation }}
      .checkInDate {{ showCheckInDate }}
      //- span.checkOutDate {{ checkOutDate }}
      .guest {{ showGuestNumber }}
      .material-icons.icon.search-icon search
      SearchDetail(v-show='isSearchBarVisible')
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
  position: sticky;
  top: 0;
  /* display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr)); */
  /* grid-template-columns: auto 1fr auto; */
  display: flex;
  flex-basis: auto;
  align-items: center;
  padding: 1.25rem 0;

  /* align-items: center;
  justify-content: space-between; */
  /* gap: 1rem;
  margin: 0.5rem; */
}

nav > * {
  flex-grow: 1;
}

header a.router-link-exact-active {
  color: var(--color-text);
}

header a.router-link-exact-active:hover {
  background-color: transparent;
}

.nav-list {
  display: flex;
  align-items: center;
  justify-content: flex-end;
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
  border: 2px solid rgb(91, 190, 134);
  border-radius: 9999px;
  gap: 0.5rem;

  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  padding-left: 0.5rem;
}

.search-icon {
  height: 2rem;
  padding: 0.25rem 0;
  margin: auto;
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

@media (max-width: 768px) {
  header {
    padding: 0 2.5rem;
  }
  .search-container {
    border: none;
  }
  .search-icon {
    display: none;
  }
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
