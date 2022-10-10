<script>
// eslint-disable-next-line no-unused-vars
import { RouterView } from 'vue-router'

import HeaderCmp from './components/header.vue'

import { mapActions } from 'vuex'

export default {
  name: 'App',
  components: { HeaderCmp },
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
  RouterView 
</template>

<style scoped></style>
