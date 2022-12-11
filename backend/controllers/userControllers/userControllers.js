const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../../models/User')
const sendError = require('../../utils/sendError')

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
    // httpOnly: true,
    // sameSite: 'none',
    // secure: true,
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
    sendError(res, 400, "Sorry, user doesn't not exist")
  }
  const validatedPassword = await bcrypt.compare(password, user.password)
  // Token and cookie
  const token = gererateToken(user._id)
  res.cookie('token', token, {
    path: '/',
    expires: new Date(Date.now() + 1000 * 86400),
    // httpOnly: true,
    // sameSite: 'none',
    // secure: true,
  })
  if (user && validatedPassword) {
    const { _id, name, email, phone, photo, bio } = user

    res.status(200).json({
      _id,
      name,
      email,
      phone,
      photo,
      bio,
      token,
    })
  } else {
    sendError(res, 400, 'Password is incorrect')
  }
})

const logout = asyncHandler(async (req, res) => {
  res.cookie('token', '', {
    path: '/',
    expires: new Date(0),
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  })

  res.status(200).json({ message: 'Successfully logged out' })
})

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (!user) {
    sendError(res, 400, 'User not found')
  }
  const { _id, name, email, phone, photo, bio } = user

  res.status(200).json({
    _id,
    name,
    email,
    phone,
    photo,
    bio,
  })
})

const loginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token
  if (!token) {
    return res.json(false)
  }
  const verified = jwt.verify(token, process.env.JWT_SECRET)
  if (!verified) {
    return res.json(false)
  }
  return res.json(true)
})

const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    const { name, email, phone, photo, bio } = user
    user.name = req.body.name || name
    user.email = req.body.email || email
    user.phone = req.body.phone || phone
    user.photo = req.body.photo || photo
    user.bio = req.body.bio || bio
    const updatedUser = await user.save()
    res.status(200).json({
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      photo: updatedUser.photo,
      bio: updatedUser.bio,
    })
  } else {
    sendError(res, 404, 'User not found')
  }
})



module.exports = {
  register,
  login,
  logout,
  getUser,
  loginStatus,
  updateProfile,
}
