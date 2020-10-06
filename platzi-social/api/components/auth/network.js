const router = require('express').Router()

const response = require('../../../network/response')
const controller = require('./index')

router.post('/login', login)

function login (req, res, next) {
  const { username, passowrd } = req.body

  controller.login(username, passowrd)
    .then(token => {
      response.success(req, res, token, 200)
    })
    .catch(next)
}

module.exports = router
