const router = require('express').Router()

const secure = require('../../../network/secure')
const response = require('../../../network/response')
const controller = require('./index')

router.get('/', list)
router.get('/:postId', get)
router.post('/', secure('upsert'), upsert)
router.put('/:postId', secure('update'), update)
router.delete('/:postId', secure('remove'), remove)

function list (req, res, next) {
  controller.list()
    .then(posts => response.success(req, res, posts, 200))
    .catch(next)
}

function get (req, res, next) {
  const { params: { postId } } = req

  controller.get(postId)
    .then(post => response.success(req, res, post, 200))
    .catch(next)
}

function upsert (req, res, next) {
  const { body: post } = req

  controller.upsert(post)
    .then(result => response.success(req, res, result, 201))
    .catch(next)
}

function update (req, res, next) {
  const { params: { postId }, body: post } = req

  controller.update(postId, post)
    .then(result => response.success(req, res, result, 200))
    .catch(next)
}

function remove (req, res, next) {
  const { params: { postId } } = req

  controller.remove(postId)
    .then(result => response.success(req, res, result, 200))
    .catch(next)
}

module.exports = router
