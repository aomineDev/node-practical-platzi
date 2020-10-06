const config = {
  port: process.env.PORT || '3000',
  secret: process.env.SERET || 'notsecure',
  mysql: {
    host: process.env.MYSQL_HOST || 'bmfpf1xhvpg0wskvqenq-mysql.services.clever-cloud.com',
    user: process.env.MYSQL_USER || 'u2jlrstakqcczs3q',
    password: process.env.MYSQL_PASS || 'XN2mmJ95ACjgCdboYCEa',
    database: process.env.MYSQL_DB || 'bmfpf1xhvpg0wskvqenq',
    port: process.env.MYSQL_PORT || 3306
  }
}

module.exports = config
