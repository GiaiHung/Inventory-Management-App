const clientRouter = require('./client')
const userRouter = require('./user')

function route(app) {
    app.use('/api/user', userRouter)
    app.use('/client', clientRouter)
}

module.exports = route