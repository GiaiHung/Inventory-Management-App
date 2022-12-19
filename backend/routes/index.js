const clientRouter = require('./client')
const userRouter = require('./user')
const overviewRouter = require('./overview')
const managementRouter = require('./management')

function route(app) {
    app.use('/api/user', userRouter)
    app.use('/client', clientRouter)
    app.use('/overview', overviewRouter)
    app.use('/management', managementRouter)
}

module.exports = route