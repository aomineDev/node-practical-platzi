const handleConnection = require('../lib/mysql')

const connection = handleConnection()

function list (table) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (error, results) => {
      if (error) return reject(error)

      resolve(results)
    })
  })
}

function get (table, id) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} WHERE id='${id}'`, (error, results) => {
      if (error) return reject(error)

      resolve(results)
    })
  })
}

function query (table, q, join) {
  let joinQuery = ''

  if (join) {
    const key = Object.keys(join)[0]
    const val = join[key]
    joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`
  }

  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ?`, q, (error, results) => {
      if (error) return reject(error)

      resolve(results || null)
    })
  })
}

function upsert (table, data) {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ?`, data, (error, results) => {
      if (error) return reject(error)

      resolve(results)
    })
  })
}

function update (table, id, data) {
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE ${table} SET ? WHERE id='${id}'`, data, (error, results) => {
      if (error) return reject(error)

      resolve(results)
    })
  })
}

function remove (table, id) {
  return new Promise((resolve, reject) => {
    connection.query(`DELETE FROM ${table} WHERE id='${id}'`, (error, results) => {
      if (error) return reject(error)

      resolve(results)
    })
  })
}

module.exports = {
  list,
  get,
  query,
  upsert,
  update,
  remove
}
