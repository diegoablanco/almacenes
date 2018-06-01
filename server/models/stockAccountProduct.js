const Sequelize = require('sequelize')

module.exports = function (sequelize) {
  const StockAccountProduct = sequelize.define('stockAccountproduct', {
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
    product
  }) {
    StockAccountProduct.belongsTo(product)
  }
  return StockAccountProduct
}
