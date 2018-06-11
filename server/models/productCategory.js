const Sequelize = require('sequelize')

module.exports = function (sequelize) {
  const ProductCategory = sequelize.define('productCategory', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    }
  })
  return ProductCategory
}
