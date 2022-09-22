<script>
import axios from 'axios'

export default {
  name: 'NewBookingCard',
  props: ['bungalow'],
  data() {
    return {
      checkInDate: '',
      checkOutDate: '',
      invalidInput: false,
    }
  },
  methods: {
    async submitBooking() {
      if (this.checkInDate === '' || this.checkOutDate === '') {
        this.invalidInput = true
        return
      }
      this.invalidInput = false

      await axios.post('http://localhost:4000/api/bookings', {
        checkInDate: this.checkInDate,
        checkOutDate: this.checkOutDate,
        bungalowId: this.bungalow._id,
      })
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
    p(v-if="invalidInput")
      | One or more date fields are invalid.
  input.btn.btn-success(type="submit", value="Book now")
</template>

<style scoped>
.new-booking-card {
  width: 18rem;
  border: 1px solid rgb(88, 249, 158);
  border-radius: 0.3rem;
  padding: 18px;
}
</style>
