<script>
import BungalowCard from '@/components/bungalow-card.vue'
import axios from 'axios'
import { mapActions } from 'vuex'

export default {
  name: 'Bungalows',
  components: { BungalowCard },
  data() {
    return {
      bungalows: [],
    }
  },
  async created() {
    this.bungalows = await this.fetchBungalows()
  },
  methods: {
    ...mapActions(['fetchBungalows']),
  },
}
</script>

<template lang="pug">
main.bungalow-list
  h1 Rent a Bungalow for Your Next Escape

  router-link(:to="`/bungalows/${bungalow._id}`" v-for="bungalow in bungalows") 
    BungalowCard(:bungalow="bungalow")
    

</template>

<style>
@media (min-width: 1024px) {
  .bungalow-list {
    min-height: 100vh;
  }
}
</style>
