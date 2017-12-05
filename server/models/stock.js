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
    }
  })
  Stock.associate = function ({ customer, stockMovement, carrier, warehouse, warehouseInstruction }) {
    Stock.belongsTo(warehouse)
    Stock.belongsTo(customer)
    Stock.belongsTo(customer, { as: 'targetCustomer' })
    Stock.belongsTo(customer, { as: 'billingCustomer' })
    Stock.belongsTo(carrier)
    Stock.belongsToMany(stockMovement, { as: 'movements', through: 'stock_movements' })
    Stock.belongsToMany(warehouseInstruction, { as: 'instructions', through: 'stock_instructions' })
  }
  return Stock
}
