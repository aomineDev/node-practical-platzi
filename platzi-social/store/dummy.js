const db = {
  user: [
    { id: 1, name: 'aomine' },
    { id: 2, name: 'omar' }
  ]
}

function list (table) {
  return db[table]
}

function get (table, id) {
  const collection = list(table)
  return collection.find(item => item.id === id) || null
}

function upsert (table, data) {
  db[table].push(data)
}

function remove (table, id) {
  const index = db[table].findIndex(item => item.id === id)

  db[table].splice(index, 1)
}

module.exports = {
  list,
  get,
  upsert,
  remove
}
