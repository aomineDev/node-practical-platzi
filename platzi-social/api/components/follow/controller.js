const dummyStore = require('../../../store/dummy')

const table = 'user_follow'

function followController (injectedStore) {
  const store = injectedStore || dummyStore

  function following (userId) {
    const join = {}
    join.user = 'user_to'

    const query = { user_from: userId }

    return store.query(table, query, join)
  }

  function follow (from, to) {
    const data = {
      user_from: from,
      user_to: to
    }

    return store.upsert(table, data)
  }

  return {
    following,
    follow
  }
}

module.exports = followController
