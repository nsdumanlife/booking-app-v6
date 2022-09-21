<script>
import axios from 'axios'

export default {
  name: 'Bungalow',
  components: {},
  data() {
    return {
      bungalow: null,
    }
  },
  async created() {
    const bungalowRequest = await axios.get(`http://localhost:4000/api/bungalows/${this.$route.params.bungalowId}`)

    this.bungalow = bungalowRequest.data
  },
}
</script>

<template lang="pug">
main.bungalow
  h1 hello from {{bungalow.name}} bungalow detail 
 

</template>
