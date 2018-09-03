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
    description: {
      type: Sequelize.STRING
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
    stockReference,
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
    Stock.belongsToMany(stockReference, { as: 'references', through: 'stock_references' })
    Stock.hasMany(stockMovement, { as: 'movements' })
    Stock.hasMany(stockService, { as: 'services' })
    Stock.hasMany(stockIssue, { as: 'issues' })
    Stock.belongsTo(stockStatus, { as: 'status' })
    Stock.belongsTo(user, { as: 'createdBy' })
    Stock.belongsTo(user, { as: 'updatedBy' })
  }
  Stock.isHierarchy({
    through: 'stock_ancestors',
    freezeTableName: true
  })
  return Stock
}
