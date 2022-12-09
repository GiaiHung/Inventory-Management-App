const express = require('express')
const userRouter = express.Router()
const { register } = require('../controllers/userControllers')

userRouter.post('/register', register)

module.exports = userRouter
