const sendError = require('../../utils/sendError')
const User = require('../../models/User')

const getCustomers = async (req, res) => {
  try {
    const { search } = req.query
    const customers = await User.find({
      role: 'user'
    }).select('-password')
    res.status(200).json(customers)
  } catch (error) {
    sendError(res, 400, 'Cannot get customers')
  }
}

module.exports = { getCustomers }
