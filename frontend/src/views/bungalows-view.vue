<script>
import BungalowsListing from '@/components/bungalows-listing.vue'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Bungalows',
  components: { BungalowsListing },
  // data() {
  //   return {
  //     bungalows: [],
  //   }
  // },
  // async mounted() {
  //   this.bungalows = await this.fetchBungalows()
  // },
  methods: {
    ...mapActions(['fetchBungalows', 'fetchFilteredBungalows']),
  },
  computed: {
    ...mapState(['checInDate', 'checkOutDate', 'guest', 'location', 'bungalows']),
  },
}
</script>

<template lang="pug">
.bungalow-list
  BungalowsListing(:bungalows='bungalows')
</template>

<style></style>
