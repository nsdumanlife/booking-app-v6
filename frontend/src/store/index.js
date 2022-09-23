import axios from 'axios'
import { createStore } from 'vuex'

const mutations = {}

export default createStore({
  state: {
    checkInDate: '',
    checkOutDate: '',
    guest: 2,
    location: 'Sapanca',
  },
  mutations: {},
  actions: {
    async fetchBungalow(store, id) {
      const bungalowRequest = await axios.get(`http://localhost:4000/api/bungalows/${id}`)
      return bungalowRequest.data
    },
    async fetchBungalows() {
      const bungalowsRequest = await axios.get(`http://localhost:4000/api/bungalows/`)
      return bungalowsRequest.data
    },
    async fetchBookings() {
      const bookingsRequest = await axios.get(`http://localhost:4000/api/bookings/`)
      return bookingsRequest.data
    },
  },
})
