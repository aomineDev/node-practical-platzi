const express = require('express')

const config = require('../config')
const user = require('./components/user/network')

const app = express()

app.use('/api/user', user)

app.listen(config.port, () => {
  console.log(`[server] app listening in http://localhost:${config.port}`)
})
