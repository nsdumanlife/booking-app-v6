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
  h1 Rent a Bungalow for Your Next Escape
  SearchBar
  router-link(:to="`/bungalows/${bungalow._id}`" v-for="bungalow in bungalows") 
    BungalowCard(:bungalow="bungalow")
</template>
