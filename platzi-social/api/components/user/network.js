const router = require('express').Router()

const response = require('../../../network/response')
const controller = require('./controller')

router.get('/', (req, res) => {
  const list = controller.list()

  response.success(req, res, list, 200)
})

module.exports = router
