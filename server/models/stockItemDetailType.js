const Sequelize = require('sequelize')

module.exports = function (sequelize) {
  const StockItemDetailType = sequelize.define('stockItemDetailType', {
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
    code: {
      type: Sequelize.STRING
    }
  })
  return StockItemDetailType
}
