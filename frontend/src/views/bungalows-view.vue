<script>
import BungalowCard from '@/components/bungalow-card.vue'
import axios from 'axios'

export default {
  name: 'Bungalows',
  components: { BungalowCard },
  data() {
    return {
      bungalows: [],
    }
  },
  async created() {
    const bungalowsRequest = await axios.get('http://localhost:4000/api/bungalows')

    this.bungalows = bungalowsRequest.data
  },
}
</script>

<template lang="pug">
main.bungalow-list
  h1 Rent a Bungalow for Your Next Escape
  BungalowCard(v-for="bungalow in bungalows" :bungalow="bungalow")

</template>

<style>
@media (min-width: 1024px) {
  .bungalow-list {
    min-height: 100vh;
  }
}
</style>
