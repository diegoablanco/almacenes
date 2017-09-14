const config = require('config')
const Sequelize = require('sequelize')

module.exports = function() {
  const { database: { user, password, host, name } } = config
  return new Sequelize(name, user, password, {
    dialect: 'mssql',
    host: host
  })
}
