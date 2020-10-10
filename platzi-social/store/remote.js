const request = require('request')

function createRemoteDb (host, port) {
  const URL = `http://${host}:${port}/mysql`

  function list (table) {
    return req('GET', table)
  }

  function get (table, id) {
    return req('GET', `${table}/${id}`)
  }

  function query (table, q, join) {
    return req('GET', `query/${table}`, { q, join })
  }

  function upsert (table, data) {
    return req('POST', table, data)
  }

  function update (table, id, data) {
    return req('PUT', `${table}/${id}`, data)
  }

  function remove (table, id) {
    return req('DELETE', `${table}/${id}`)
  }

  function req (method, table, data) {
    const url = `${URL}/${table}`

    return new Promise((resolve, reject) => {
      request({
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        url,
        body: JSON.stringify(data)
      }, (err, req, body) => {
        if (err) {
          console.error('[mysql]', err)
          return reject(err.message)
        }

        const response = JSON.parse(body)

        return resolve(response.body)
      })
    })
  }

  return {
    list,
    get,
    query,
    upsert,
    update,
    remove
  }
}

module.exports = createRemoteDb
