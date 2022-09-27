const express = require('express')
const Booking = require('../models/booking')
const Bungalow = require('../models/bungalow')

const router = express.Router()

/* GET bookings listing. */
router.get('/', async (req, res, next) => {
  try {
    // req.isLoggedIn? throw 401 error
    if (!req.isLoggedIn) res.status(401).send('You need to login')

    return res.send(req.user.bookings)
    // return res.render('bookings', { title: 'Bookings', user, loggedIn: true })
  } catch (e) {
    return next(e)
  }
})
/* POST/create new booking. */
router.post('/', async (req, res) => {
  try {
    const bungalow = await Bungalow.findById(req.body.bungalowId)

    if (!bungalow) throw new Error('No bungalow found')

    const booking = await req.user.book(bungalow, new Date(req.body.checkInDate), new Date(req.body.checkOutDate))
    return res.send(booking)
  } catch (e) {
    return res.status(400).send({ msg: e.message, status: 400 })
  }
})

router.delete('/:bookingId', async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.bookingId)

    if (!booking)
      return res.render('error', {
        error: { status: 404 },
        message: `Booking can not found`,
      })

    await req.user.cancelBooking(booking)

    return res.redirect('/bookings')
  } catch (e) {
    return next(e)
  }
})

module.exports = router
