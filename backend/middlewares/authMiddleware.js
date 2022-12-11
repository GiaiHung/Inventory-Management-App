const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/User')
const sendError = require('../utils/sendError')

const protect = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.token
    if (!token) {
      sendError(res, 401, 'Unauthorized, please login first')
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(verified.id).select('-password')
    if (!user) {
      sendError(res, 400, 'User not found')
    }
    req.user = user
    next()
  } catch (error) {
    sendError(res, 400, 'Please login')
  }
})

module.exports = protect
