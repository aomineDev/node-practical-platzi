const controller = require('./controller')
const config = require('../../../config')

let store = null

if (config.mysqlService.isActive === 'true') {
  store = require('../../../store/remote-mysql')
} else {
  store = require('../../../store/mysql')
}

module.exports = controller(store)
