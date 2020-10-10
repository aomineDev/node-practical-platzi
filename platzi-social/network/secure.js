const auth = require('../auth')

function checkAuth (action) {
  function middleware (req, res, next) {
    const owner = req.params.userId || req.body.user

    switch (action) {
      case 'upsert':
        checkToken()
        break
      case 'update':
        authentication()
        break
      case 'remove':
        authentication()
        break
      default:
        next()
    }

    function authentication () {
      auth.check.own(req, owner)
      next()
    }

    function checkToken () {
      auth.check.logged(req)
      next()
    }
  }

  return middleware
}

module.exports = checkAuth
