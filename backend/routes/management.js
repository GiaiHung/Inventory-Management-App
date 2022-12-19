const express = require('express')
const router = express.Router()
const { getAdmin } = require('../controllers/management/adminController')

router.get('/admin', getAdmin)

module.exports = router
