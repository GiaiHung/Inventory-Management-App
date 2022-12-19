const clientRouter = require('./client')
const userRouter = require('./user')
const overviewRouter = require('./overview')

function route(app) {
    app.use('/api/user', userRouter)
    app.use('/client', clientRouter)
    app.use('/overview', overviewRouter)
}

module.exports = route