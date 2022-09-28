const express = require('express')

const router = express.Router()

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

module.exports = router
