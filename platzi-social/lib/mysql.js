const mysql = require('mysql')

const config = require('../config')

const { host, port, user, password, database } = config.mysql

const dbconfig = { host, port, user, password, database }

function handleConnection () {
  const connection = mysql.createConnection(dbconfig)

  connection.connect(err => {
    if (err) {
      console.error('[mysql] ', err)
      setTimeout(handleConnection, 2000)
    } else {
      console.log('[mysql] DB Connected')
    }
  })

  connection.on('error', err => {
    console.error('[mysql] ', err)

    if (err.code === 'PROTOCOL_CONNECTION_LOST') handleConnection()
    else throw err
  })

  return connection
}

module.exports = handleConnection
