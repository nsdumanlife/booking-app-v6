<script>
import axios from 'axios'

export default {
  name: 'BungalowDetail',
  components: {},
  data() {
    return {
      bungalow: [],
    }
  },
  async getBungalow() {
    const bungalowRequest = await axios.get(`http://localhost:4000/api/bungalows/${bungalowId}`)

    this.bungalows = bungalowRequest.data
  },
  computed: {
    bungalowId() {
      return this.$route.params.id
    },
  },
}
</script>

<template lang="pug">
main.bungalow
  h1 Rent a Bungalow for Your Next Escape
 

</template>
