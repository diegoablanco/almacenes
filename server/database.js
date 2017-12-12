const config = require('config')
const Sequelize = require('sequelize')

module.exports = function () {
  const { database: { user, password, host, name } } = config
  const sequelize = new Sequelize(name, user, password, {
    dialect: 'mssql',
    host
  })

  sequelize.import('../server/models/user')
  sequelize.import('../server/models/phoneType')
  sequelize.import('../server/models/phone')
  sequelize.import('../server/models/address')
  sequelize.import('../server/models/contact')
  sequelize.import('../server/models/account')
  sequelize.import('../server/models/customer')
  sequelize.import('../server/models/service')
  sequelize.import('../server/models/carrier')
  sequelize.import('../server/models/warehouse')
  sequelize.import('../server/models/warehouseService')
  sequelize.import('../server/models/warehouseInstruction')
  sequelize.import('../server/models/stockMovement')
  sequelize.import('../server/models/stockMovementType')
  sequelize.import('../server/models/stock')
  sequelize.import('../server/models/stockBox')
  sequelize.import('../server/models/stockItemDetail')
  sequelize.import('../server/models/stockItemDetailType')
  sequelize.import('../server/models/documentType')

  Object.keys(sequelize.models).forEach((modelName) => {
    if ('associate' in sequelize.models[modelName]) {
      sequelize.models[modelName].associate(sequelize.models);
    }
  })

  return sequelize
}
