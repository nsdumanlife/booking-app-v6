<script>
import NewBookingCard from '@/components/new-booking-card.vue'
import Review from '@/components/review.vue'
import ImageCmp from '@/components/image.vue'
import ImageGallery from '@/components/image-gallery.vue'
import { mapActions } from 'vuex'

export default {
  name: 'Bungalow',
  components: { NewBookingCard, Review, ImageCmp, ImageGallery },
  data() {
    return {
      bungalow: {},
    }
  },
  async created() {
    this.bungalow = await this.fetchBungalow(this.$route.params.bungalowId)
  },
  computed: {
    showReview() {
      if (this.bungalow.reviews.length === 0) return 'No reviews yet'
      if (this.bungalow.reviews.length === 1) return '1 review'
      return this.bungalow.reviews.length + ' reviews'
    },
  },
  methods: {
    ...mapActions(['fetchBungalow']),
  },
}
</script>

<template lang="pug">
main.bungalow
  .bungalow-name
    h1 {{ bungalow.name }}
  .bungalow-top-info
    p.rating(v-if='bungalow.rating') 
      .material-icons.star star
      | {{ bungalow.rating }} - {{ showReview }}
    p(v-else) No review yet
    p.location {{ bungalow.location }}
  ImageGallery(:bungalow='bungalow')
  //- ImageCmp
  .bungalow-info
    h4 Services
    p It is empty for now, i haven't work enums in mongoose yet :(
    .services(v-for='service in bungalow.services')
      p Service Name Here
    NewBookingCard(:bungalow='bungalow')
    h3 Reviews of Bungalow {{ bungalow.name }}
    .rating(v-if='!bungalow.rating')
      | No reviews yet!
    .rating(v-else)
      Review(:bungalow='bungalow')
</template>

<style lang="scss" scoped>
.bungalow {
  .bungalow-top-info {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .rating {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .star {
        font-size: 1.1rem;
      }
    }
  }
  .bungalow-info {
  }
}
</style>
