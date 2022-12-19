const express = require('express')
const router = express.Router()
const { salesController } = require('../controllers/overview/salesController')

router.get('/sales', salesController)

module.exports = router
