const db = require('../lib/dummy')

async function list (table) {
  return db[table]
}

async function get (table, id) {
  const collection = db[table]

  return collection.find(item => item.id === id) || null
}

async function query (table, q) {
  const keys = Object.keys(q)
  const key = keys[0]

  return db[table].find(item => item[key] === q[key]) || null
}

async function upsert (table, data) {
  db[table].push(data)

  return data
}

async function update (table, id, data) {
  const index = db[table].findIndex(item => item.id === id)
  const user = db[table][index]

  db[table][index] = {
    ...user,
    ...data
  }

  return db[table][index]
}

async function remove (table, id) {
  const index = db[table].findIndex(item => item.id === id)

  db[table].splice(index, 1)

  return {
    message: 'removed successfully'
  }
}

module.exports = {
  list,
  get,
  query,
  upsert,
  update,
  remove
}
