<script>
import BungalowsListing from '@/components/bungalows-listing.vue'
import { mapActions } from 'vuex'

export default {
  name: 'Bungalows',
  components: { BungalowsListing },
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
.bungalow-list
  BungalowsListing(:bungalows="bungalows")
</template>

<style></style>
