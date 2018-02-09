const Sequelize = require('sequelize')

module.exports = function (sequelize) {
  const Stock = sequelize.define('stock', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    customInstructions: {
      type: Sequelize.STRING
    },
    onHold: {
      type: Sequelize.BOOLEAN, defaultValue: false
    },
    reference: {
      type: Sequelize.STRING
    }
  })
  Stock.associate = function ({
    customer,
    stockMovement,
    carrier,
    warehouse,
    warehouseInstruction,
    stockBox,
    stockPallets,
    documentAttachment,
    fileAttachment,
    stockService,
    stockStatus }) {
    Stock.belongsTo(warehouse)
    Stock.belongsTo(carrier)
    Stock.belongsTo(customer)
    Stock.belongsTo(customer, { as: 'targetCustomer' })
    Stock.belongsTo(customer, { as: 'billingCustomer' })
    Stock.belongsTo(stockBox, { as: 'boxes' })
    Stock.belongsTo(stockPallets, { as: 'palets' })
    Stock.belongsToMany(warehouseInstruction, { as: 'instructions', through: 'stock_instructions' })
    Stock.belongsToMany(documentAttachment, { as: 'documents', through: 'stock_documents' })
    Stock.belongsToMany(fileAttachment, { as: 'images', through: 'stock_images' })
    Stock.hasMany(stockMovement, { as: 'movements' })
    Stock.hasMany(stockService, { as: 'services' })
    Stock.belongsTo(stockStatus, { as: 'status' })
  }
  return Stock
}
