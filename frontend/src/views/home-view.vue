<script>
import SearchBar from '@/components/search-bar.vue'
import SearchDetail from '@/components/search-detail.vue'
import { mapState } from 'vuex'

export default {
  name: 'HomeView',
  components: { SearchBar, SearchDetail },
  computed: {
    ...mapState(['isSearchBarVisible']),
  },
}
</script>

<template lang="pug">
main
  h1 Rent a Bungalow for Your Next Escape
  SearchBar
  SearchDetail(v-show='isSearchBarVisible')
</template>

<style scoped>
body {
  display: flex;
  align-content: space-between;
}
</style>
