const sendError = require('../../utils/sendError')
const OverallStat = require('../../models/OverallStat')
const Transaction = require('../../models/Transaction')

const dashboardController = async (req, res) => {
  try {
    // hardcoded values
    const currentMonth = 'November'
    const currentYear = 2021
    const currentDate = '2021-11-15'

    const transactions = await Transaction.find().limit(50).sort({ createdOn: -1 })

    const overallStat = await OverallStat.find({ year: currentYear })
    const {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      dailyData,
      salesByCategory,
    } = overallStat[0]
    const thisMonthStat = monthlyData.find(({ month }) => month === currentMonth)
    const todayStat = dailyData.find(({ date }) => date === currentDate)

    res.status(200).json({
      transactions,
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      thisMonthStat,
      todayStat,
      salesByCategory,
    })
  } catch (error) {
    sendError(res, 400, error.message)
  }
}

module.exports = { dashboardController }
