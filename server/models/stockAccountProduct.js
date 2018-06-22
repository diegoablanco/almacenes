const Sequelize = require('sequelize')

module.exports = function (sequelize) {
  const StockAccountProduct = sequelize.define('stockAccountProduct', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  })
  StockAccountProduct.associate = function ({
    stockAccount,
    productType
  }) {
    StockAccountProduct.belongsTo(stockAccount)
    StockAccountProduct.belongsTo(productType)
  }
  return StockAccountProduct
}
