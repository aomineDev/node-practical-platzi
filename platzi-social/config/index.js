const config = {
  api: {
    port: process.env.PORT || 3000
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'notsecure'
  },
  mysql: {
    host: process.env.MYSQL_HOST || 'bmfpf1xhvpg0wskvqenq-mysql.services.clever-cloud.com',
    user: process.env.MYSQL_USER || 'u2jlrstakqcczs3q',
    password: process.env.MYSQL_PASS || 'XN2mmJ95ACjgCdboYCEa',
    database: process.env.MYSQL_DB || 'bmfpf1xhvpg0wskvqenq',
    port: process.env.MYSQL_PORT || 3306
  },
  mysqlService: {
    isActive: process.env.MYSQL_SERVER_IS_ACTIVE || 'true',
    host: process.env.MYSQL_SERVER_HOST || 'localhost',
    port: process.env.MYSQL_SERVER_PORT || 3001
  },
  post: {
    port: process.env.POST_PORT || 3002
  }
}

module.exports = config
