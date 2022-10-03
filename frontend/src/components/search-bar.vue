<script>
import { mapActions } from 'vuex'

export default {
  name: 'SearchBar',
  components: {},
  computed: {
    location: {
      get() {
        return this.$store.state.location
      },
      set(value) {
        this.$store.dispatch('setLocation', value)
      },
    },
    checkInDate: {
      get() {
        return this.$store.state.checkInDate
      },
      set(value) {
        this.$store.dispatch('setCheckInDate', value)
      },
    },
    checkOutDate: {
      get() {
        return this.$store.state.checkOutDate
      },
      set(value) {
        this.$store.dispatch('setCheckOutDate', value)
      },
    },
    guest: {
      get() {
        return this.$store.state.guest
      },
      set(value) {
        this.$store.dispatch('setGuest', value)
      },
    },
  },
  methods: {
    ...mapActions(['fetchFilteredBungalows', 'setBungalows']),
    async submitFormAndUpdateBungalows() {
      const filteredBungalows = await this.fetchFilteredBungalows(this.location)

      this.$store.dispatch('setBungalows', filteredBungalows)
      this.$router.push('/bungalows')
    },
  },
}
</script>

<template lang="pug">
.search-bar
  form.row(@submit.prevent='submitFormAndUpdateBungalows')
    .col
      label.form-label(for='location') Where to?
        input#location.form-control(type='text', name='location', placeholder='Sapanca', v-model='location')
    .col
      label.form-label(for='checkInDate') Check-in date
        input#checkInDate.form-control(type='date', name='checkInDate', v-model='checkInDate')
    .col
      label.form-label(for='checkOutDate') Check-out date
        input#checkOutDate.form-control(type='date', name='checkOutDate', v-model='checkOutDate')
    .col
      label.form-label(for='guestNumber') Guest:
        input#guestNumber.form-control(type='number', name='guestNumber', v-model='guest', min='2')
    .col.pt-4
      input.btn.btn-success(type='submit', value='Search')
</template>

<style scoped>
.search-bar {
  width: 80vw;
  border: 1px solid rgb(88, 249, 158);
  border-radius: 0.3rem;
  padding: 1rem;
}
</style>
