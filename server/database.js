const config = require('config')
const Sequelize = require('sequelize-hierarchy')()

module.exports = function () {
  const { database: { user, password, host, name } } = config
  const sequelize = new Sequelize(name, user, password, {
    dialect: 'mssql',
    host,
    dialectOptions: {
      requestTimeout: 30000
    }
  })
  
  sequelize.import('../server/models/role')
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
  sequelize.import('../server/models/stockReference')
  sequelize.import('../server/models/stockBox')
  sequelize.import('../server/models/stockPallets')
  sequelize.import('../server/models/stockItemDetail')
  sequelize.import('../server/models/stockItemDetailType')
  sequelize.import('../server/models/stockService')
  sequelize.import('../server/models/documentType')
  sequelize.import('../server/models/documentAttachment')
  sequelize.import('../server/models/fileAttachment')
  sequelize.import('../server/models/stockStatus')
  sequelize.import('../server/models/stockIssue')
  sequelize.import('../server/models/product')
  sequelize.import('../server/models/productCategory')
  sequelize.import('../server/models/productType')
  sequelize.import('../server/models/stockAccountMovement')
  sequelize.import('../server/models/stockAccount')
  sequelize.import('../server/models/stockAccountProduct')

  Object.keys(sequelize.models).forEach((modelName) => {
    if ('associate' in sequelize.models[modelName]) {
      sequelize.models[modelName].associate(sequelize.models);
    }
  })

  return sequelize
}
