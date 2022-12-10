const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const sendError = require('../utils/sendError')

const gererateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' })
}

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
  const user = await User.create({
    name,
    email,
    password,
  })

  // Token and cookie
  const token = gererateToken(user._id)
  res.cookie('token', token, {
    path: '/',
    expires: new Date(Date.now() + 1000 * 86400),
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  })

  if (user) {
    const { name, email, phone, photo, bio } = user
    res.status(201).json({
      name,
      email,
      phone,
      photo,
      bio,
      token,
    })
  } else {
    sendError(res, 400, 'Invalid user data')
  }
})

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  // Validation
  if (!email || !password) {
    sendError(res, 400, 'Please fill in all the required fields')
  }
  const user = await User.findOne({ email })
  if (!user) {
    sendError(res, 400, 'Sorry, user doesn not exist')
  }
  const validatedPassword = await bcrypt.compare(password, user.password)
  if (user && validatedPassword) {
    const { _id, name, email, phone, photo, bio } = user
    // Token and cookie
    const token = gererateToken(user._id)
    res.cookie('token', token, {
      path: '/',
      expires: new Date(Date.now() + 1000 * 86400),
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    })
    res.status(200).json({
      _id,
      name,
      email,
      phone,
      photo,
      bio,
      token
    })
  } else {
    sendError(res, 400, 'Password is incorrect')
  }
})

module.exports = { register, login }
