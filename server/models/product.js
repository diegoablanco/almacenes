const Sequelize = require('sequelize')

module.exports = function (sequelize) {
  const Product = sequelize.define('product', {
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
  return Product
}
