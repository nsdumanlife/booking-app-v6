<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'NewBookingCard',
  props: ['bungalow'],
  computed: {
    ...mapState(['checkInDate', 'checkOutDate']),
    totalPrice() {
      if (new Date(this.checkOutDate) - new Date(this.checkInDate) < 0) return

      return (this.bungalow.price * (new Date(this.checkOutDate) - new Date(this.checkInDate))) / (24 * 60 * 60 * 1000)
    },
  },
  methods: {
    ...mapActions(['createBooking', 'setCheckInDate', 'setCheckOutDate']),
    async submitBooking() {
      try {
        await this.createBooking({
          checkInDate: this.checkInDate,
          checkOutDate: this.checkOutDate,
          bungalowId: this.bungalow._id,
        })
        this.$router.push('/bookings')
      } catch (e) {
        this.error = e.response.data.msg
      }
    },
  },
}
</script>

<template lang="pug">
form.new-booking-card(@submit.prevent='submitBooking')
  .card-title.price-for-night
    h5.mb-3 {{ bungalow.price }} TRY /
    p night
  .check-in-date.mb-3
    label.form-label(for='checkInDate') Check-in date
      input.form-control(type='date', name='checkInDate', v-model='checkInDate', required)
  .check-out-date.mb-3
    label.form-label(for='checkOutDate') Check-out date
      input.form-control(type='date', name='checkOutDate', v-model='checkOutDate', required) 
  input.btn.btn-success.mb-3(type='submit', value='Book now')
  .total(v-show='checkInDate&&checkOutDate') 
    p Total
    p {{ totalPrice }} TRY
  p(v-if='error')
    | {{ error }}
</template>

<style lang="scss" scoped>
.new-booking-card {
  width: 18rem;
  border: 1px solid rgb(88, 249, 158);
  border-radius: 0.3rem;
  padding: 18px;

  .price-for-night {
    display: flex;
    p {
      margin-left: 0.25rem;
    }
  }
  .total {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
