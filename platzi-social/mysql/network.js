const router = require('express').Router()

const response = require('../network/response')
const store = require('../store/mysql')

router.get('/:table', list)
router.get('/query/:table', query)
router.get('/:table/:id', get)
router.post('/:table', upsert)
router.put('/:table/:id', update)
router.delete('/:table/:id', remove)

async function list (req, res, next) {
  const { params: { table } } = req

  try {
    const result = await store.list(table)

    response.success(req, res, result, 200)
  } catch (error) {
    response.error(req, res, error.message, 500)
  }
}

async function get (req, res, next) {
  const { params: { table, id } } = req
  const result = await store.get(table, id)

  response.success(req, res, result, 200)
}

async function query (req, res, next) {
  const { params: { table }, body: { q, join } } = req

  const result = await store.query(table, q, join)

  response.success(req, res, result, 200)
}

async function upsert (req, res, next) {
  const { params: { table }, body: data } = req

  const result = await store.upsert(table, data)

  response.success(req, res, result, 201)
}

async function update (req, res, next) {
  const { params: { table, id }, body: data } = req

  const result = await store.update(table, id, data)

  response.success(req, res, result, 200)
}

async function remove (req, res, next) {
  const { params: { table, id } } = req

  const result = await store.remove(table, id)

  response.success(req, res, result, 200)
}

module.exports = router
