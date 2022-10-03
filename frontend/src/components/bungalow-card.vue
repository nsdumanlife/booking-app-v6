<script>
export default {
  name: 'BungalowCard',
  props: ['bungalow'],
  data() {
    return {}
  },
}
</script>

<template lang="pug">
.bungalow-list-item
  h3 {{ bungalow.name }} 
  h4 {{bungalow.location}}
  p {{bungalow.price}} TRY
  //- p(v-if="bungalow.rating")
  //-   | {{bungalow.rating}} star{{bungalow.rating > 1 ? 's' : ''}} - {{bungalow.reviews.length}} review{{bungalow.reviews.length > 1 ? 's' : ''}}
  //- p(v-else)
  //-   | No review yet!

</template>

<style scoped>
.bungalow-list-item {
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 0.3rem;
  margin: 0.8rem 0;
}
</style>
