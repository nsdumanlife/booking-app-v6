/* eslint-disable no-underscore-dangle */
const request = require('supertest')
const app = require('../src/app')

const agent = request.agent(app)

describe('bookings endpoint', () => {
  let authenticatedSession

  beforeEach(async () => {
    const userToLogin = {
      email: 'test@test.com',
      password: 'Test',
    }

    authenticatedSession = await agent.post('/api/account/session').send(userToLogin)

    return authenticatedSession
  })

  it('create a new booking', async () => {
    const bungalowToCreate = {
      name: 'somebungalowbooking',
      location: 'somewherebooking',
      capacity: 4,
      price: 1250,
    }

    let tomorrow = new Date(+new Date() + 86400000)
    tomorrow = new Date(+new Date().setHours(0, 0, 0, 0) + 86400000)
    tomorrow = new Date(+new Date().setHours(0, 0, 0, 0) + 86400000).toLocaleDateString('fr-CA')

    let tomorrowPlusTwo = new Date(+new Date() + 86400000 * 3)
    tomorrowPlusTwo = new Date(+new Date().setHours(0, 0, 0, 0) + 86400000 * 3)
    tomorrowPlusTwo = new Date(+new Date().setHours(0, 0, 0, 0) + 86400000 * 3).toLocaleDateString('fr-CA')

    const checkInDate = new Date(tomorrow)
    const checkOutDate = new Date(tomorrowPlusTwo)

    const bungalowRequest = await agent.post('/api/bungalows').send(bungalowToCreate).expect(200)
    const createdBungalow = bungalowRequest.body

    const bookingRequest = await agent
      .post(`/api/bookings`)
      .send({ bungalowId: createdBungalow._id, checkInDate, checkOutDate })
    // booking does not include createdUser because it takes loggedInUser in user.book
    const createdBooking = bookingRequest.body

    // // new booking for unavailable dates
    // const unvalidBookingRequest = await agent
    //   .post(`/bookings`)
    //   .send({ guest: createdUser, bungalowId: createdBungalow._id, checkInDate, checkOutDate })
    // const createdUnvalidBooking = unvalidBookingRequest.body

    // expect(createdUnvalidBooking).toThrow('Please select different date')
    expect(createdBooking.totalPrice).toBe(2500)
    expect(createdBooking.status).toBe('Upcoming')
    await agent.delete(`/api/bungalows/${createdBungalow._id}`)
  })
  it('get bookings list', async () => {
    const bookingsRequest = await agent.get('/api/bookings').expect(200)
    const bookings = bookingsRequest.body

    const bookingsExist = bookings.length > 0

    expect(bookingsExist).toBe(true)
  })
})
