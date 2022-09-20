<script>
import BookingCard from '@/components/booking-card.vue'
import axios from 'axios'

export default {
  name: 'Bookings',
  components: { BookingCard },
  data() {
    return {
      bookings: [],
    }
  },
  async created() {
    const bookingsRequest = await axios.get('http://localhost:4000/api/bookings')

    this.bookings = bookingsRequest.data
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
