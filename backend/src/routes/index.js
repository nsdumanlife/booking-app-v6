/* eslint-disable no-unused-vars */
const express = require('express')

const router = express.Router()

const Bungalow = require('../models/bungalow')
const Image = require('../models/image')
const User = require('../models/user')

/* GET home page. */
router.get('/', async (req, res) => {
  res.render('index', {
    title: `Rent a Bungalow for Your Next Escape`,
    user: req.user,
    loggedIn: req.loggedIn,
  })
})

router.get('/create-bungalow', async (req, res, next) => {
  try {
    return res.render('create-bungalow', { title: `Become a host`, user: req.user, loggedIn: req.loggedIn })
  } catch (e) {
    return next(e)
  }
})

router.get('/ping', async (req, res, next) => {
  try {
    return res.sendStatus(200)
  } catch (e) {
    return next(e)
  }
})

router.get('/initialize', async (req, res, next) => {
  try {
    const faruk = new User({ username: 'Faruk', firstName: 'Faruk', lastName: 'Duman', age: 26, email: 'f@gmail.com' })
    await faruk.setPassword('test')
    await faruk.save()

    // Bungalows
    const tepe = await Bungalow.create({
      name: 'tepe',
      location: 'Sapanca, Sakarya',
      capacity: 8,
      price: 950,
      owner: faruk,
    })
    const lion = await Bungalow.create({
      name: 'lion',
      location: 'Kumbag, Tekirdag',
      capacity: 4,
      price: 1250,
      owner: faruk,
    })
    const dogancay = await Bungalow.create({
      name: 'dogancay',
      location: 'Geyve, Sakarya, Turkey',
      capacity: 5,
      price: 1150,
      owner: faruk,
    })
    const oxygen = await Bungalow.create({
      name: 'oxygen',
      location: 'Geyve, Sakarya',
      capacity: 8,
      price: 950,
      owner: faruk,
    })

    // Images

    const imageOxygenFrontside = await Image.create({
      src: 'https://img.otelz.com/s3/turkiye/sakarya/sapanca/whatsappimage20211205at15.50.1624298f7c7559245cfabbd1a81c66dc930.jpg',
      alt: 'Frontside photo of bungalow Oxygen',
    })

    const imageOxygenInside = await Image.create({
      src: 'https://oxygenbungalov.com/tema/genel/uploads/odalar/kapak/oksijen_bungalov.jpeg',
      alt: 'Inside photo of bungalow Oxygen',
    })

    oxygen.images.push(imageOxygenFrontside, imageOxygenInside)
    await oxygen.save()
    // oxygen.services.push('internet', 'barbecue', 'hot tub')

    const checkInDate = new Date('10/22/2022')
    const checkOutDate = new Date('10/29/2022')
    const checkInDate1 = new Date('12/01/2023')
    const checkOutDate1 = new Date('12/05/2023')
    const checkInDate2 = new Date('02/01/2023')
    const checkOutDate2 = new Date('02/03/2023')
    const checkInDateFaruk = new Date('10/17/2023')
    const checkOutDateFaruk = new Date('10/21/2023')

    // await numan.book(lion, checkInDate, checkOutDate)
    // await numan.book(dogancay, checkInDate1, checkOutDate1)
    // await numan.book(tepe, checkInDate2, checkOutDate2)
    // await numan.cancelBooking('631a3c3677b43133a0d1db71')
    await faruk.book(oxygen, checkInDate2, checkOutDate2)
    await faruk.review(oxygen, 'Amazing view!', 5)

    const turtle = await faruk.createBungalow('turtle', 'Akbuk, Mugla', 2, 1750, 'pool')
    // await faruk.book(turtle, checkInDateFaruk, checkOutDateFaruk)
    // await faruk.review(turtle, 'That was an amazing vacation!', 5)

    // // console.log(numan)
    return res.sendStatus(200)
  } catch (e) {
    return next(e)
  }
})

module.exports = router
