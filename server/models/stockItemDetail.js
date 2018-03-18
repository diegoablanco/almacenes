const Sequelize = require('sequelize')

module.exports = function (sequelize) {
  const StockItemDetail = sequelize.define('stockItemDetail', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    description: {
      type: Sequelize.STRING
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  })
  StockItemDetail.associate = function ({ stockItemDetailType }) {
    StockItemDetail.belongsTo(stockItemDetailType)
  }
  return StockItemDetail
}
