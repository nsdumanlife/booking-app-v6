<script>
// eslint-disable-next-line no-unused-vars
import { RouterView } from 'vue-router'

import HeaderCmp from './components/header.vue'
import FooterCmp from './components/footer.vue'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  components: { HeaderCmp, FooterCmp },
  methods: {
    ...mapActions(['fetchSession']),
  },
  async created() {
    await this.fetchSession()
  },
}
</script>

<template lang="pug">
div
  .header
    HeaderCmp
  RouterView 
  FooterCmp
</template>

<style scoped></style>
