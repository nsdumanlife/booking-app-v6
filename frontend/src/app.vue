<script>
// eslint-disable-next-line no-unused-vars
import { RouterView } from 'vue-router'

import HeaderCmp from './components/header.vue'
import HeaderCmpCopy from './components/header-copy.vue'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  components: { HeaderCmp, HeaderCmpCopy },
  methods: {
    ...mapActions(['fetchSession']),
  },
  async created() {
    await this.fetchSession()
  },
}
</script>

<template lang="pug">
#app
  .header
    HeaderCmp
    //- HeaderCmpCopy
  RouterView 
</template>

<style scoped></style>
