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
    }
  })
  return ProductType
}
