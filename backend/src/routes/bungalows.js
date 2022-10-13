const express = require('express')
// const { celebrate, Joi, errors, Segments } = require('celebrate')

const router = express.Router()

const Bungalow = require('../models/bungalow')

/* GET bungalows listing. */
router.get(
  '/',
  // celebrate({
  //   [Segments.QUERY]: {
  //     name: Joi.string(),
  //     location: Joi.string(),
  //   },
  // }),
  async (req, res, next) => {
    try {
      const bungalows = await Bungalow.find({})

      if (!bungalows)
        return res.render('error', {
          error: { status: 404 },
          message: `No bungalow found`,
        })

      if (req.query.name) {
        const bungalow = await Bungalow.find({
          name: { $regex: `${req.query.name}`, $options: 'i' },
        })

        return res.send(bungalow)
      }
      if (req.query.location) {
        const bungalow = await Bungalow.find({
          location: { $regex: `${req.query.location}`, $options: 'i' },
        })

        return res.send(bungalow)
      }

      return res.send(bungalows)
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

/* POST/create new review. */
router.post('/:bungalowId/reviews', async (req, res, next) => {
  try {
    const bungalow = await Bungalow.findById(req.params.bungalowId)

    if (!bungalow)
      return res.render('error', {
        error: { status: 404 },
        message: `No bungalow found`,
      })

    const review = await req.user.review(bungalow, req.body.text, req.body.rate)
    return res.send(review)
    // return res.redirect(`/bungalows/${bungalow.id}`)
  } catch (e) {
    return next(e)
  }
})
/* POST/create new bungalow */
router.post('/', async (req, res, next) => {
  try {
    const bungalow = await req.user.createBungalow(req.body.name, req.body.location, req.body.capacity, req.body.price)

    return res.send(bungalow)
  } catch (e) {
    return next(e)
  }
})

router.get('/filtered', async (req, res, next) => {
  try {
    // const { location, checkInDate, checkOutDate, guest } = req.body
    console.log('Req query:', req.query)

    const query = []

    if (req.body.guestNumber) {
      query.push({
        guest: { $gte: req.body.guestNumber },
      })
    }

    // if (req.body.location) {
    //   query.push({
    //     location: { $regex: `${req.query.location}`, $options: 'i' },
    //   })
    // }

    const filteredBungalows = await Bungalow.find({ guest: { $gte: 4 } })
    res.send(filteredBungalows)
  } catch (e) {
    next(e)
  }
})

module.exports = router
