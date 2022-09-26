/* eslint-disable no-useless-catch */
import axios from 'axios'
import { createStore } from 'vuex'
axios.defaults.baseURL = 'http://localhost:4000/api'

const Mutations = {
  SET_CHECKINDATE: 'SET_CHECKINDATE',
  SET_CHECKOUTDATE: 'SET_CHECKOUTDATE',
  SET_GUEST: 'SET_GUEST',
  SET_LOCATION: 'SET_LOCATION',
  SET_BUNGALOWS: 'SET_BUNGALOWS',

  SET_USER: 'SET_USER',
}

export default createStore({
  state: {
    checkInDate: '',
    checkOutDate: '',
    guest: null,
    location: 'Sapanca',
    user: null,
    bungalows: [],
  },
  mutations: {
    [Mutations.SET_CHECKINDATE](state, checkInDate) {
      state.checkInDate = checkInDate
    },
    [Mutations.SET_CHECKOUTDATE](state, checkOutDate) {
      state.checkOutDate = checkOutDate
    },
    [Mutations.SET_GUEST](state, guest) {
      state.guest = guest
    },
    [Mutations.SET_LOCATION](state, location) {
      state.location = location
    },
    [Mutations.SET_USER](state, user) {
      state.user = user
    },
    [Mutations.SET_BUNGALOWS](state, bungalows) {
      state.bungalows = bungalows
    },
  },
  actions: {
    setCheckInDate({ commit }, checkInDate) {
      commit(Mutations.SET_CHECKINDATE, checkInDate)
    },
    setCheckOutDate({ commit }, checkOutDate) {
      commit(Mutations.SET_CHECKOUTDATE, checkOutDate)
    },
    setLocation({ commit }, location) {
      commit(Mutations.SET_LOCATION, location)
    },
    setGuest({ commit }, guest) {
      commit(Mutations.SET_GUEST, guest)
    },
    setBungalows({ commit }, bungalows) {
      commit(Mutations.SET_BUNGALOWS, bungalows)
    },
    async fetchBungalow(store, id) {
      const bungalowRequest = await axios.get(`/bungalows/${id}`)
      return bungalowRequest.data
    },
    async fetchBungalows() {
      const bungalowsRequest = await axios.get(`/bungalows/`)
      return bungalowsRequest.data
    },
    async fetchFilteredBungalows(store, location) {
      const filteredBungalowsRequest = await axios.get(`/bungalows?location=${location}`)

      return filteredBungalowsRequest.data
    },
    async fetchBookings() {
      const bookingsRequest = await axios.get(`/api/bookings/`)
      return bookingsRequest.data
    },
    async fetchSession({ commit }) {
      const user = await axios.get('/account/session')
      commit(Mutations.SET_USER, user.data || null)
    },
    async login({ commit }, credentials) {
      try {
        const user = await axios.post('/account/session', credentials)
        commit(Mutations.SET_USER, user.data)
      } catch (e) {
        throw e
      }
    },
    async register(store, user) {
      return axios.post('/api/account', user)
    },
    async logout({ commit }) {
      await axios.delete('/account/session')
      commit(Mutations.SET_USER, null)
    },
    async createBooking(store, booking) {
      return axios.post('/bookings', booking)
    },
  },
  modules: {},
})
