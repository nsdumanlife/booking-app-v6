<script setup>
// eslint-disable-next-line no-unused-vars
import { RouterLink, RouterView } from 'vue-router';
</script>

<template lang="pug">
header
  RouterLink.logo(to="/")
    img.d-inline-block.align-text-top.logo-icon(src='./components/icons/hut-svgrepo-com.svg' alt='Bungaa' width='30' height='30')
    span Bungaa
  nav
    RouterLink(to="/bookings") Bookings
    RouterLink(to="/login") Login
    RouterLink(to="/register") Register
RouterView 
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
