const express = require('express')
const passport = require('passport')
const User = require('../models/user')

const router = express.Router()

router.get('/session', (req, res) => {
  res.send(req.user)
})

router.post('/', async (req, res, next) => {
  const { firstName, lastName, age, email, password } = req.body

  try {
    // const userToCreate = {
    //   firstName: req.body.firstName,
    //   lastName: req.body.lastName,
    //   age: req.body.age,
    //   email: req.body.email,
    //   password: req.body.password,
    // }

    const user = await User.register({ firstName, lastName, age, email }, password)
    // await user.setPassword(req.body.password)
    // await user.save()

    return res.send(user)
  } catch (e) {
    return next(e)
  }
})

router.post('/session', passport.authenticate('local', { failWithError: true }), async (req, res) => {
  res.send(req.user)
})

router.delete('/session', async (req, res, next) => {
  await req.logout()

  req.session.regenerate(err => {
    if (err) return next(err)

    return res.sendStatus(200)
  })
})

module.exports = router
