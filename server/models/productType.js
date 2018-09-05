const Sequelize = require('sequelize')

module.exports = function (sequelize) {
  const ProductType = sequelize.define('productType', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    },
    ean: {
      type: Sequelize.STRING,
      allowNull: false
    },
    price: {
      type: Sequelize.DataTypes.DECIMAL(10, 2)
    }
  })
  ProductType.associate = function ({
    productCategory
  }) {
    ProductType.belongsTo(productCategory, { as: 'category' })
  }
  return ProductType
}
