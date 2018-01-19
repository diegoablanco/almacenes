const Sequelize = require('sequelize')

module.exports = function (sequelize) {
  const WarehouseService = sequelize.define('stockService', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    rate: {
      type: Sequelize.DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  })
  WarehouseService.associate = function ({ service }) {
    WarehouseService.belongsTo(service)
  }
  return WarehouseService
}
