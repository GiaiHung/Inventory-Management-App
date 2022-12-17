const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    supply: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Product', ProductSchema)
