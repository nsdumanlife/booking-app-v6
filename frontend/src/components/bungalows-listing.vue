<script>
import BungalowCard from '@/components/bungalow-card.vue'
import SearchBar from '@/components/search-bar.vue'

export default {
  name: 'BungalowsListing',
  components: { SearchBar, BungalowCard },
  props: ['bungalows'],
}
</script>

<template lang="pug">
main.bungalow-list
  SearchBar
  router-link(v-if='bungalows.length', :to='`/bungalows/${bungalow._id}`', v-for='bungalow in bungalows') 
    BungalowCard(:bungalow='bungalow')
  p(v-else) There is no such a bungalow.
</template>

<style lang="scss" scoped>
p {
  margin-top: 5rem;
  display: flex;
  justify-content: center;
}
</style>
