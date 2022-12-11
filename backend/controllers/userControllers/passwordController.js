const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const asyncHandler = require('express-async-handler')
const User = require('../../models/User')
const Token = require('../../models/Token')
const sendError = require('../../utils/sendError')
const sendMail = require('../../utils/sendEmail')

const updatePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body
  const user = await User.findById(req.user._id)
  if (!user) {
    sendError(res, 404, 'User not found')
  }
  if (!oldPassword || !newPassword) {
    sendError(res, 400, 'Please enter old and new password')
  }
  const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password)
  if (isPasswordCorrect && user) {
    user.password = newPassword
    await user.save()
    res.status(200).json('Password changed')
  } else {
    sendError(res, 401, 'Password is incorrect')
  }
})

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email })
  if (!user) {
    sendError(res, 400, 'User not found')
  }

  // Clear up the old token
  const token = await Token.findOne({ userId: user._id })
  if (token) {
    await token.deleteOne()
  }

  // Save reset token to database
  const resetToken = crypto.randomBytes(32).toString('hex')
  await Token.create({
    userId: user._id,
    token: resetToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 1000 * 60 * 30,
  })

  // Send email
  const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`
  const message = `
    <h2>Hello ${user.name}</h2>
    <p>You have requested for a password reset</p>
    <p>Please use the link below to change your password</p>
    <p>The reset link is only valid for <u>30 minutes</u></p>
    <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    <p>Regards!</p>
  `
  const subject = 'Password Reset Request'
  const send_to = user.email
  const sent_from = process.env.EMAIL_NAME

  try {
    await sendMail(subject, message, send_to, sent_from)
    res.status(200).json({ success: true, message: 'Email sent successfully!' })
  } catch (error) {
    sendError(res, 500, "Can't send email, please try again later")
  }
})

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body
  const { resetToken } = req.params
  const token = await Token.findOne({ token: resetToken, expiresAt: { $gt: Date.now() } })
  if (!token) {
    sendError(res, 404, 'Invalid or token has expired')
  }
  const user = await User.findOne({ _id: token.userId })
  if (!user) {
    sendError(res, 400, 'User not found')
  }
  user.password = password

  await user.save()
  res.status(200).json({ success: true, message: 'Changed password successfully' })
})

module.exports = { updatePassword, forgotPassword, resetPassword }
