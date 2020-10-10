const router = require('express').Router()

const response = require('../../../network/response')
const controller = require('./index')

router.post('/login', login)

function login (req, res, next) {
  const { username, password } = req.body

  controller.login(username, password)
    .then(token => {
      response.success(req, res, token, 200)
    })
    .catch(next)
}

module.exports = router
