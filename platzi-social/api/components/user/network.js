const router = require('express').Router()

const secure = require('../../../network/secure')
const response = require('../../../network/response')
const controller = require('./index')

router.get('/', list)
router.get('/:userId', get)
router.post('/', upsert)
router.put('/:userId', secure('update'), update)
router.delete('/:userId', secure('remove'), remove)

// Internal functions

function list (req, res, next) {
  controller.list()
    .then(list => {
      response.success(req, res, list, 200)
    })
    .catch(next)
}

function get (req, res, next) {
  const { params: { userId } } = req

  controller.get(userId)
    .then(user => {
      response.success(req, res, user, 200)
    })
    .catch(next)
}

function upsert (req, res, next) {
  const { body: user } = req

  controller.upsert(user)
    .then(user => {
      response.success(req, res, user, 201)
    })
    .catch(next)
}

function update (req, res, next) {
  const { params: { userId } } = req
  const { body: data } = req

  controller.update(userId, data)
    .then(user => {
      response.success(req, res, user, 200)
    })
    .catch(next)
}

function remove (req, res, next) {
  const { params: { userId } } = req

  controller.remove(userId)
    .then(message => {
      response.success(req, res, message, 200)
    })
    .catch(next)
}

module.exports = router
