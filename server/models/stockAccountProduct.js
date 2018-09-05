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
    },
    price: {
      type: Sequelize.DataTypes.DECIMAL(10, 2)
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
