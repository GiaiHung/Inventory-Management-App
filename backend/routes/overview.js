const express = require('express')
const router = express.Router()
const { salesController } = require('../controllers/overview/salesController')
const { dashboardController } = require('../controllers/overview/dashboardController')

router.get('/sales', salesController)
router.get('/dashboard', dashboardController)

module.exports = router
