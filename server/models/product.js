const Sequelize = require('sequelize')

module.exports = function (sequelize) {
  const Product = sequelize.define('product', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    code: {
      type: Sequelize.STRING,
      allowNull: false
    }
  })
  Product.associate = function ({
    productType,
    stockAccountMovement
  }) {
    Product.belongsTo(productType, { as: 'type' })
    Product.belongsTo(stockAccountMovement)
  }
  return Product
}
