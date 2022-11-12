const express = require('express')
const { celebrate, Joi, errors, Segments } = require('celebrate')

const router = express.Router()

const Bungalow = require('../models/bungalow')
const Image = require('../models/image')

/* GET bungalows listing. */
router.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      name: Joi.string(),
      location: Joi.string(),
      guest: Joi.number(),
      checkInDate: Joi.string(),
      checkOutDate: Joi.string(),
    },
  }),
  async (req, res, next) => {
    try {
      const query = {}

      if (req.query.name) query.name = { $regex: `${req.query.name}`, $options: 'i' }

      if (req.query.location) query.location = { $regex: `${req.query.location}`, $options: 'i' }

      if (req.query.guest) query.capacity = { $gte: req.query.guest }

      if (req.query.checkInDate && req.query.checkOutDate)
        query.bookedDates = { $not: { $gte: new Date(req.query.checkInDate), $lte: new Date(req.query.checkOutDate) } }

      return res.send(await Bungalow.find(query))
    } catch (e) {
      return next(e)
    }
  }
)
/* GET bungalow detail page. */
router.get('/:bungalowId', async (req, res, next) => {
  try {
    const bungalow = await Bungalow.findById(req.params.bungalowId)

    if (bungalow) return res.send(bungalow)

    return res.sendStatus(404)
  } catch (e) {
    return next(e)
  }
})
router.get('/:bungalowId/image/:imageId', async (req, res, next) => {
  try {
    const image = await Image.findById(req.params.imageId)

    if (image) return res.send(image)

    return res.sendStatus(404)
  } catch (e) {
    return next(e)
  }
})

/* POST/create new review. */
router.post(
  '/:bungalowId/reviews',
  celebrate({
    [Segments.QUERY]: {
      bungalow: Joi.string(),
      text: Joi.string(),
      rate: Joi.number(),
    },
  }),
  async (req, res, next) => {
    try {
      const bungalow = await Bungalow.findById(req.params.bungalowId)

      if (!bungalow)
        return res.render('error', {
          error: { status: 404 },
          message: `No bungalow found`,
        })

      const review = await req.user.review(bungalow, req.body.text, req.body.rate)
      return res.send(review)
    } catch (e) {
      return next(e)
    }
  }
)
/* POST/create new bungalow */
router.post(
  '/',
  celebrate({
    [Segments.QUERY]: {
      name: Joi.string(),
      location: Joi.string(),
      capacity: Joi.number(),
      price: Joi.number(),
    },
  }),
  async (req, res, next) => {
    try {
      const bungalow = await req.user.createBungalow(
        req.body.name,
        req.body.location,
        req.body.capacity,
        req.body.price,
        req.body.images
      )

      return res.send(bungalow)
    } catch (e) {
      return next(e)
    }
  }
)

router.delete('/:id', async (req, res) => {
  await Bungalow.findByIdAndDelete(req.params.id)
  res.sendStatus(200)
})

module.exports = router
