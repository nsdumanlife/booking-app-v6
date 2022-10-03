<script>
export default {
  name: 'Review',
  props: ['bungalow'],
  data() {
    return {}
  },
}
</script>

<template lang="pug">
.review-list.review-card.card.text-bg-dark(v-for='review in bungalow.reviews')
  .card-body
    p {{ review.rate }}
    p {{ review.text }}
    p - {{ review.author.firstName }}
</template>

<style scoped>
.review-card {
  width: 18rem;
  border: 1px solid rgb(88, 249, 158);
  border-radius: 0.3rem;
  padding: 18px;
}
</style>
