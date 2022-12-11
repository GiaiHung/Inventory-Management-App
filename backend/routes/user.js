const express = require('express')
const userRouter = express.Router()
const {
  register,
  login,
  logout,
  getUser,
  loginStatus,
  updateProfile,
} = require('../controllers/userControllers/userControllers')
const {
  forgotPassword,
  updatePassword,
  resetPassword,
} = require('../controllers/userControllers/passwordController')
const protect = require('../middlewares/authMiddleware')

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.post('/logout', logout)
userRouter.post('/forgotPassword', forgotPassword)

userRouter.get('/getUser', protect, getUser)
userRouter.get('/loginStatus', loginStatus)

userRouter.patch('/updateProfile', protect, updateProfile)
userRouter.patch('/updatePassword', protect, updatePassword)

userRouter.put('/resetPassword/:resetToken', resetPassword)

module.exports = userRouter
