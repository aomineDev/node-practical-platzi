exports.success = (req, res, message, status) => {
  const statusCode = status || 200
  const statusMessage = message || ''

  res.status(statusCode).json({
    error: false,
    status: statusCode,
    body: statusMessage
  })
}

exports.error = (req, res, message, status) => {
  const statusCode = status || 500
  const statusMessage = message || 'Internal server error'

  res.status(statusCode).json({
    error: true,
    status: statusCode,
    body: statusMessage
  })
}
