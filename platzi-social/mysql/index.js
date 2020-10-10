const express = require('express')

const config = require('../config')

const routes = require('./network')

const app = express()

app.use(express.json())

app.use('/mysql', routes)
// Routes

app.listen(config.mysqlService.port, () => {
  console.log(`[server] MySQL service is listening in http://localhost:${config.mysqlService.port}`)
})
