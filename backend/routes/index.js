const userRouter = require('./user')

function route(app) {
    app.use('/api/user', userRouter)
}

module.exports = route