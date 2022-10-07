<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'SearchDetail',
  components: {},
  computed: {
    ...mapState(['isSearchBarVisible']),
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
    ...mapActions(['fetchFilteredBungalows', 'setBungalows', 'setIsSearchBarVisible']),
    async submitFormAndUpdateBungalows() {
      const filteredBungalows = await this.fetchFilteredBungalows(this.location)

      this.closeSearchDetail()
      this.$store.dispatch('setBungalows', filteredBungalows)
      this.$router.push('/bungalows')
    },
    closeSearchDetail() {
      this.$store.dispatch('setIsSearchBarVisible', false)
    },
  },
}
</script>

<template lang="pug">
section.container
  .header
    h3 Edit your search
    span.material-icons.icon(@click='closeSearchDetail') close
  form.options.col(@submit.prevent='submitFormAndUpdateBungalows')
    .location.row(@click='selectLocation') 
      label.form-label(for='location') Where to?
        input#location.form-control(type='text', name='location', placeholder='Enter location', v-model='location')
    .checkInDate.row
      label.form-label(for='checkInDate') Check-in date
        input#checkInDate.form-control(type='date', name='checkInDate', v-model='checkInDate')
    .checkOutDate.row
      label.form-label(for='checkOutDate') Check-out date
        input#checkOutDate.form-control(type='date', name='checkOutDate', v-model='checkOutDate')
    .guests.row
      label.form-label(for='guestNumber') Guest:
        input#guestNumber.form-control(
          type='number',
          name='guestNumber',
          placeholder='Add guests',
          v-model='guest',
          min='1'
        )
    .searchBtn.col.mt-3
      input.btn.btn-success(type='submit', value='Search')
</template>

<style lang="scss" scoped>
section {
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: var(--color-background);
  padding: 1.8rem 2.2rem;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
  }

  .icon {
    font-size: 1.8rem;
    cursor: pointer;
  }

  .options {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    overflow: hidden;
    margin-bottom: 3.6rem;
  }
}
</style>
