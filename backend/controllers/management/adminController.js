const sendError = require('../../utils/sendError')
const User = require('../../models/User')

const getAdmin = async (req, res) => {
  try {
    const customers = await User.find({
      $or: [{ role: 'admin' }, { role: 'superadmin' }],
    }).select('-password')
    res.status(200).json(customers)
  } catch (error) {
    sendError(res, 400, 'Cannot get admins')
  }
}

module.exports = { getAdmin }
