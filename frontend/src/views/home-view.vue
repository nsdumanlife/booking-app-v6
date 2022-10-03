<script>
import SearchBar from '@/components/search-bar.vue';

export default {
  name: 'HomeView',
  components: { SearchBar },
}
</script>

<template lang="pug">
main
  h1 Rent a Bungalow for Your Next Escape
  SearchBar
</template>

<style scoped>
body {
  display: flex;
  align-content: space-between;
}
</style>
