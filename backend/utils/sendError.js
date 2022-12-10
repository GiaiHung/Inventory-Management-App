const sendError = (res, status, message) => {
  res.status(status)
  throw new Error(message)
}

module.exports = sendError
