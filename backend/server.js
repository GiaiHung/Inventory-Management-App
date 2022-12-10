require('dotenv').config()
require('colors')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()
const PORT = process.env.PORT || 5000
const route = require('./routes')
const errorHandler = require('./middlewares/errorMiddleware')

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Routes
app.get('/', (req, res) => {
  res.send('Home page')
})
route(app)

// Error handler middleware
app.use(errorHandler)

mongoose.set('strictQuery', true)
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB'.underline.bold.yellow)
    app.listen(PORT, () => {
      console.log(`Server is listening on ${PORT}`.underline.bold.cyan)
    })
  })
  .catch((error) => console.log(error.message))
