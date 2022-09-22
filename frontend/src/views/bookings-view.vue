<script>
import BookingCard from '@/components/booking-card.vue'
import axios from 'axios'
import { mapActions } from 'vuex'

export default {
  name: 'Bookings',
  components: { BookingCard },
  data() {
    return {
      bookings: [],
    }
  },
  async created() {
    this.bookings = await this.fetchBookings()
  },
  methods: {
    ...mapActions(['fetchBookings']),
  },
}
</script>

<template lang="pug">
main.bookings-list
  h1 Your bookings
  BookingCard(v-for="booking in bookings" :booking="booking")

</template>

<style>
@media (min-width: 1024px) {
  .booking-list {
    min-height: 100vh;
  }
}
</style>
