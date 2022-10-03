<script>
import BookingCard from '@/components/booking-card.vue'
import { mapActions } from 'vuex'

export default {
  name: 'Bookings',
  components: { BookingCard },
  data() {
    return {
      bookings: [],
      error: null,
    }
  },
  async created() {
    try {
      this.bookings = await this.fetchBookings()
    } catch (e) {
      this.error = e.message
    }
  },
  methods: {
    ...mapActions(['fetchBookings']),
  },
}
</script>

<template lang="pug">
main.bookings-list
  h1 Your bookings
  BookingCard(v-for='booking in bookings', :booking='booking')
  p(v-if='error') 
    | {{ error }}
</template>

<style></style>
