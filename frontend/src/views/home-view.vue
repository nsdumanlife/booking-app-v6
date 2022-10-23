<script>
import SearchBar from '@/components/search-bar.vue'

export default {
  name: 'HomeView',
  components: { SearchBar },
}
</script>

<template lang="pug">
main.hero-image
  h1.hero-text Rent a Bungalow for Your Next Escape
  .search-bar
    SearchBar
</template>

<style lang="scss" scoped>
// height: 100vh;
// display: flex;
// flex-direction: column;
// justify-content: space-around;

.hero-image {
  display: flex;
  flex-direction: column;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('../assets/hero.jpg');
  min-height: 50em;
  height: 50%;
  align-self: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  align-items: flex-start;
  justify-content: center;
}

.hero-text {
  text-align: center;
  color: white;
  align-self: center;
  font-size: 60px;
  font-weight: 600;
  line-height: 70px;
  margin-bottom: 4rem;
}

.search-bar {
  padding: 1.5rem;
}
</style>
