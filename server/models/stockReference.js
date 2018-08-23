const Sequelize = require('sequelize')

module.exports = function (sequelize) {
  const StockReference = sequelize.define('stockReference', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    reference: {
      type: Sequelize.STRING
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  })
  return StockReference
}
