const Sequelize = require('sequelize')

module.exports = function (sequelize) {
  const StockMovement = sequelize.define('stockMovement', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    date: {
      type: Sequelize.DataTypes.DATE,
      default: Sequelize.DataTypes.Now
    }
  })
  StockMovement.associate = function ({ stockMovementType }) {
    StockMovement.belongsTo(stockMovementType)
  }
  return StockMovement
}
