const Transaction = require('../../models/Transaction')
const sendError = require('../../utils/sendError')

const getTransactions = async (req, res) => {
  try {
    // sort should look like this: { "field": "userId", "sort": "desc"}
    const { page = 1, pageSize = 20, search = '', sort = null } = req.query

    // formatted sort should look like { userId: -1 }
    const generateSort = () => {
      const sortParsed = JSON.parse(sort)
      const sortFormatted = {
        [sortParsed.field]: sortParsed.sort === 'asc' ? 1 : -1,
      }

      return sortFormatted
    }

    const sortFormatted = Boolean(sort) ? generateSort() : {}
    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: new RegExp(search, 'i') } },
        { userId: { $regex: new RegExp(search, 'i') } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize)

    const total = await Transaction.countDocuments({
      name: { $regex: search, $options: 'i' },
    })

    res.status(200).json({
      transactions,
      total,
    })
  } catch (error) {
    // sendError(res, 400, 'Cannot get transactions')
    console.log(error)
  }
}

module.exports = { getTransactions }
