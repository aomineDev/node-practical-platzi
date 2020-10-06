const jwt = require('jsonwebtoken')

const config = require('../config/index')
const error = require('../utils/error')

function sign (user) {
  return jwt.sign(user, config.secret)
}

function verify (token) {
  return jwt.verify(token, config.secret)
}

const check = {
  own: (req, owner) => {
    const decoded = decodeHeader(req)

    if (decoded.id !== owner) {
      throw error('No tienes los permisos necesarios', 401)
    }
  }
}

function decodeHeader (req) {
  const authorization = req.headers.authorization || ''

  const token = getToken(authorization)

  const decoded = verify(token)

  return decoded
}

function getToken (header) {
  if (!header) throw error('No se encontro el token', 400)

  if (header.indexOf('Bearer ') === -1) throw error('Token invalido', 400)

  const token = header.replace('Bearer ', '')

  return token
}

module.exports = {
  sign,
  check
}
