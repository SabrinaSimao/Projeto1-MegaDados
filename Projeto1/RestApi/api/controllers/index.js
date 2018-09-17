// This holds all our routes and controllers
const express = require('express')

const router = express.Router()

router.use('/api', require('./api'))

module.exports = router
