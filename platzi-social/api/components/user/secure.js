const auth = require('../../../auth')

function checkAuth (action) {
  function middleware (req, res, next) {
    const owner = req.params.userId

    switch (action) {
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
  }

  return middleware
}

module.exports = checkAuth
