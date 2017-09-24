const config = require('config')
const Sequelize = require('sequelize')

module.exports = function() {
  const { database: { user, password, host, name } } = config
  const sequelize = new Sequelize(name, user, password, {
    dialect: 'mssql',
    host: host
  })
  
  sequelize.import('../server/models/phoneType')
  sequelize.import('../server/models/phone')
  sequelize.import('../server/models/address')
  sequelize.import('../server/models/contact')
  sequelize.import('../server/models/account')
  sequelize.import('../server/models/customer')
  sequelize.import('../server/models/warehouse')
  sequelize.import('../server/models/stock')

  Object.keys(sequelize.models).forEach(function(modelName) {    
      if ("associate" in sequelize.models[modelName]) {
        sequelize.models[modelName].associate(sequelize.models);
      }
  })
  
  return sequelize
}
