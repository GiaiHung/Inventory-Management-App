const mongoose = require('mongoose')

const OverAllStatSchema = mongoose.Schema(
  {
    totalCustomers: Number,
    yearlySalesTotal: Number,
    yearlyTotalSoldUnits: Number,
    year: Number,
    monthlyData: [
      {
        month: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
    dailyData: [{ date: String, totalSales: Number }],
    salesByCategory: {
      shoes: Number,
      clothing: Number,
      accessories: Number,
      misc: Number,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('overAllStat', OverAllStatSchema)