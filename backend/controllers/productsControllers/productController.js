const sendError = require('../../utils/sendError')
const Product = require('../../models/Product')
const ProductStat = require('../../models/ProductStat')

const getProducts = async (req, res) => {
  try {
    const products = await Product.find()

    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStat.find({
          productId: product._id,
        })
        return {
          ...product._doc,
          stat,
        }
      })
    )

    res.status(200).json(productsWithStats)
  } catch (error) {
    sendError(res, 400, 'Cannot get products')
  }
}

module.exports = { getProducts }
