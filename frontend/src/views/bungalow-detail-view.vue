<script>
import NewBookingCard from '@/components/new-booking-card.vue'
import Review from '@/components/review.vue'
import { mapActions } from 'vuex'

export default {
  name: 'Bungalow',
  components: { NewBookingCard, Review },
  data() {
    return {
      bungalow: {},
    }
  },
  async created() {
    this.bungalow = await this.fetchBungalow(this.$route.params.bungalowId)
  },
  methods: {
    ...mapActions(['fetchBungalow']),
  },
}
</script>

<template lang="pug">
main.bungalow
  h1 {{ bungalow.name }}
  .rating(v-if="!bungalow.rating")
    | No reviews yet!
  .rating(v-else)
    | {{bungalow.rating}} star{{bungalow.rating > 1 ? 's' : ''}} {{bungalow.reviews.length}} review{{bungalow.reviews.length > 1 ? 's' : ''}}
  p {{ bungalow.location }}
  .image(v-for="image in bungalow.images")
    img(:src='image.src', :alt= 'image.alt') 
  h4 Services
  p It is empty for now, i haven't work enums in mongoose yet :(
  .services(v-for="service in bungalow.services")
    p Service Name Here
  NewBookingCard(:bungalow='bungalow')
  h3 Reviews of Bugnalow {{ bungalow.name }}
  .rating(v-if="!bungalow.rating")
    | No reviews yet!
  .rating(v-else)
    | Review(:bungalow='bungalow')
  
 

</template>
