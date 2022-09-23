<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template lang="pug">
header
  nav
    .container
    a.navbar-brand(href='#')
      img.d-inline-block.align-text-top.logo(src='./components/icons/hut-svgrepo-com.svg' alt='Bungaa' width='30' height='30')
      span Bungaa
    RouterLink(to="/") Home
    RouterLink(to="/about") About
    RouterLink(to="/bungalows") Bungalows
    RouterLink(to="/bookings") Bookings
RouterView 
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
  color: #00bd7e;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
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

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
