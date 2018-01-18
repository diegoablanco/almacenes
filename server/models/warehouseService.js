const Sequelize = require('sequelize')

module.exports = function (sequelize) {
  const WarehouseService = sequelize.define('warehouseService', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    }
  })
  WarehouseService.associate = function ({ service, stockMovementType }) {
    WarehouseService.belongsTo(service)
    WarehouseService.belongsTo(stockMovementType)
  }
  return WarehouseService
}
