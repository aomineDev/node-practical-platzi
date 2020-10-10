const express = require('express')

const config = require('../config')

const post = require('./components/post/network')

const errors = require('../network/errors')

const app = express()

// BOdy Parser
app.use(express.json())

// Routes
app.use('/api/post', post)

// hanlde errors
app.use(errors)

// Serve
app.listen(config.post.port, () => {
  console.log(`[server] post service listening in http://localhost:${config.post.port}`)
})
