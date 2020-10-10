const express = require('express')
const swaggerUi = require('swagger-ui-express')

const config = require('../config')

const user = require('./components/user/network')
const auth = require('./components/auth/network')
const follow = require('./components/follow/network')

const errors = require('../network/errors')

const swaggerDoc = require('./swagger.json')

const app = express()

// BOdy Parser
app.use(express.json())

// Routes
app.use('/api/auth', auth)
app.use('/api/user', user)
app.use('/api/follow', follow)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

// hanlde errors
app.use(errors)

// Serve
app.listen(config.api.port, () => {
  console.log(`[server] app listening in http://localhost:${config.api.port}`)
})
