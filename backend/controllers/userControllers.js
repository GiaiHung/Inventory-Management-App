const asyncHandler = require('express-async-handler')
const User = require('../models/User')
const sendError = require('../utils/sendError')
// Bcrypt
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  // Validation
  if (!name || !email || !password) {
    sendError(res, 400, 'Please fill in all the required fields')
  }
  if (password.length < 6 || password.length > 28) {
    sendError(res, 400, 'Password must be at least 6 characters or not more than 28 characters')
  }

  const existedUser = await User.findOne({ email })
  if (existedUser) {
    sendError(res, 400, 'Sorry, user already exists')
  }

  // Create user
  const hashedPassword = bcrypt.hashSync(password, salt)
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })
  if (user) {
    const { name, email, phone, photo, bio } = user
    res.status(201).json({
      name,
      email,
      phone,
      photo,
      bio,
    })
  } else {
    sendError(res, 400, 'Invalid user data')
  }
})

module.exports = { register }
