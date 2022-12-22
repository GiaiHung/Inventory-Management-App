const mongoose = require('mongoose')
const User = require('../../models/User')
const Transaction = require('../../models/Transaction')
const sendError = require('../../utils/sendError')

const getPerformance = async (req, res) => {
  try {
    const { id } = req.params
    const userWithStats = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: 'affiliates',
          localField: '_id',
          foreignField: 'userId',
          as: 'affiliateStats',
        },
      },
    ])

    const saleTransactions = await Promise.all(
      userWithStats[0].affiliateStats[0].affiliateSales.map((id) => {
        return Transaction.findById(id)
      })
    )
    const filteredTransaction = saleTransactions.filter((transaction) => transaction !== null)

    res.status(200).json({ user: userWithStats, sales: filteredTransaction })
  } catch (error) {
    sendError(res, 400, error.message)
  }
}

module.exports = { getPerformance }
