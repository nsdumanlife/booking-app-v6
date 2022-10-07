<script>
export default {
  name: 'BungalowCard',
  props: ['booking'],
  data() {
    return {}
  },
}
</script>

<template lang="pug">
.booking-list-item
  h3 {{ booking.bungalow.name }} - {{ booking.bungalow.location }}
  p {{ booking.checkInDate.substring(0,10) }} - {{ booking.checkOutDate.substring(0,10) }}
  p {{ booking.bookingDays.length }} night{{ booking.bookingDays.length > 1 ? 's' : '' }} stay
  p Total amount {{ booking.totalPrice }} TRY
</template>

<style scoped>
.booking-list-item {
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 0.3rem;
  margin: 0.8rem 0;
}
</style>
