const bcrypt = require('bcrypt')

const dummyStore = require('../../../store/dummy')
const auth = require('../../../auth')
const error = require('../../../utils/error')

const table = 'auth'

function authController (injectedStore) {
  const store = injectedStore || dummyStore

  async function login (username, password) {
    const user = await store.query(table, { username })

    if (user) {
      const payload = {
        id: user.id,
        username: user.username,
        password: user.password
      }

      const response = await bcrypt.compare(password, payload.password)

      if (response) {
        const token = auth.sign(payload)
        return { token }
      }
    }

    throw error('username or password incorrect', 400)
  }

  async function upsert ({ id, username, password }) {
    const authUser = { id }

    if (username) authUser.username = username

    if (password) authUser.password = await bcrypt.hash(password, 4)

    return store.upsert(table, authUser)
  }

  async function remove (userId) {
    return store.remove(table, userId)
  }

  return {
    login,
    upsert,
    remove
  }
}

module.exports = authController
