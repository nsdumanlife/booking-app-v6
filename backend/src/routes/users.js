const express = require('express')
const User = require('../models/user')

const router = express.Router()

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('respond with a resource')
})

/* POST create a user */
router.post('/', async (req, res) => {
  const createdUser = await User.create(req.body)
  res.send(createdUser)
})

router.delete('/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id)
  res.sendStatus(200)
})

module.exports = router
