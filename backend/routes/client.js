const express = require('express')
const { getCustomers } = require('../controllers/client/customerController')
const { getGeography } = require('../controllers/client/geoController')
const { getProducts } = require('../controllers/client/productController')
const { getTransactions } = require('../controllers/client/transactionsController')

const clientRouter = express.Router()

clientRouter.get('/products', getProducts)
clientRouter.get('/customers', getCustomers)
clientRouter.get('/transactions', getTransactions)
clientRouter.get('/geography', getGeography)

module.exports = clientRouter