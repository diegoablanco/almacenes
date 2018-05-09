const Sequelize = require('sequelize')

module.exports = function (sequelize) {
  const Warehouse = sequelize.define('warehouse', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    phone: {
      type: Sequelize.STRING
    }
  })
  Warehouse.associate = function ({ warehouseService }) {
    Warehouse.hasMany(warehouseService, { as: 'services' })
  }
  return Warehouse
};
