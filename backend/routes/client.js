const express = require('express')
const { getProducts } = require('../controllers/productsControllers/productController')

const clientRouter = express.Router()

clientRouter.get('/products', getProducts)

module.exports = clientRouter