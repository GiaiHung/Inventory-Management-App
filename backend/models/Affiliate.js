const mongoose = require('mongoose')

const AffiliateSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    affiliateSales: {
      type: [mongoose.Types.ObjectId],
      ref: 'Transaction',
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Affiliate', AffiliateSchema)
