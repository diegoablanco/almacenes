const Sequelize = require('sequelize')

module.exports = function (sequelize) {
  const StockBox = sequelize.define('stockBox', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    individualWeight: {
      type: Sequelize.DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    totalWeight: {
      type: Sequelize.DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    }
  })
  StockBox.associate = function ({ stockItemDetail }) {
    StockBox.belongsToMany(stockItemDetail, { as: 'details', through: 'stockBox_details' })
  }
  return StockBox
}
