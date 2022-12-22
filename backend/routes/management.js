const express = require('express')
const router = express.Router()
const { getAdmin } = require('../controllers/management/adminController')
const { getPerformance } = require('../controllers/management/PerformanceController')

router.get('/admin', getAdmin)
router.get('/performance/:id', getPerformance)

module.exports = router
