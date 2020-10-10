const router = require('express').Router()

const secure = require('../../../network/secure')
const response = require('../../../network/response')
const controller = require('./index')

router.get('/:userId', following)
router.post('/:userId', secure('upsert'), follow)

function following (req, res, next) {
  const { params: { userId } } = req

  controller.following(userId)
    .then(data => {
      response.success(req, res, data, 200)
    })
    .catch(next)
}

function follow (req, res, next) {
  const { params: { userId } } = req

  controller.follow(req.user.id, userId)
    .then(data => {
      response.success(req, res, data, 201)
    })
    .catch(next)
}

module.exports = router
