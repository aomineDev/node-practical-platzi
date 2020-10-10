const { nanoid } = require('nanoid')

const dummyStore = require('../../../store/dummy')

const table = 'post'

function postController (injectedStore) {
  const store = injectedStore || dummyStore

  function list () {
    return store.list(table)
  }

  function get (postId) {
    return store.get(table, postId)
  }

  function upsert (post) {
    post = {
      ...post,
      id: nanoid()
    }
    return store.upsert(table, post)
  }

  function update (postId, post) {
    return store.update(table, postId, post)
  }

  function remove (postId) {
    return store.remove(table, postId)
  }

  return {
    list,
    get,
    upsert,
    update,
    remove
  }
}

module.exports = postController
