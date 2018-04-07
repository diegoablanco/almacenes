const Sequelize = require('sequelize-hierarchy')()

module.exports = function (sequelize) {
  const Stock = sequelize.define('stock', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    customInstructions: {
      type: Sequelize.STRING
    },
    onHold: {
      type: Sequelize.BOOLEAN, defaultValue: false
    },
    reference: {
      type: Sequelize.STRING
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    date: {
      type: Sequelize.DataTypes.DATE,
      defaultValue: Sequelize.Now
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
    stockStatus,
    stockIssue,
    user
  }) {
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
    Stock.belongsTo(user, { as: 'createdBy' })
    Stock.belongsTo(user, { as: 'updatedBy' })
    Stock.belongsTo(stockIssue, { as: 'issue' })
  }
  Stock.isHierarchy({
    through: 'stock_ancestors',
    freezeTableName: true
  })
  return Stock
}
