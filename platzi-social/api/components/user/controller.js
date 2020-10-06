const { nanoid } = require('nanoid')

const dummyStore = require('../../../store/dummy')
const auth = require('../auth')

const table = 'user'

function userController (injectedStore) {
  const store = injectedStore || dummyStore

  function list () {
    return store.list(table)
  }

  function get (userId) {
    return store.get(table, userId)
  }

  async function upsert (user) {
    const { username, password, ...details } = user
    const id = nanoid()

    user = { ...details, id }

    if (username || password) await auth.upsert({ id, username, password })

    return store.upsert(table, user)
  }

  function update (id, user) {
    return store.update(table, id, user)
  }

  async function remove (userId) {
    await auth.remove(userId)

    return store.remove(table, userId)
  }

  return {
    list,
    get,
    upsert,
    update,
    remove
  }
}

module.exports = userController
