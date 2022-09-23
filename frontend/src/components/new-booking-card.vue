<script>
import axios from 'axios'

export default {
  name: 'NewBookingCard',
  props: ['bungalow'],
  data() {
    return {
      checkInDate: '',
      checkOutDate: '',
      error: null,
    }
  },
  methods: {
    async submitBooking() {
      try {
        const bookingRequest = await axios.post('http://localhost:4000/api/bookings', {
          checkInDate: this.checkInDate,
          checkOutDate: this.checkOutDate,
          bungalowId: this.bungalow._id,
        })
      } catch (e) {
        this.error = e.response.data.msg
      }
    },
  },
}
</script>

<template lang="pug">
//- form.new-booking-card(action='http://localhost:4000/api/bookings' method='post')
form.new-booking-card(@submit.prevent="submitBooking")
  h5.mb-3.card-title {{bungalow.price}} TRY / night
  .mb-3
    label.form-label(for='checkInDate') Check-in date
      input.form-control.check-in-date(type='date' name='checkInDate' v-model='checkInDate' required)
  .mb-3
    label.form-label(for='checkOutDate') Check-out date
      input.form-control.check-out-date(type='date' name='checkOutDate' v-model="checkOutDate" required) 
  input.btn.btn-success(type="submit", value="Book now")
  p(v-if="error")
    | {{error}}
</template>

<style scoped>
.new-booking-card {
  width: 18rem;
  border: 1px solid rgb(88, 249, 158);
  border-radius: 0.3rem;
  padding: 18px;
}
</style>
