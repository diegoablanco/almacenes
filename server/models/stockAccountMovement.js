const Sequelize = require('sequelize')

module.exports = function (sequelize, DataTypes) {
  const StockAccountMovement = sequelize.define('stockAccountMovement', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.ENUM('receive', 'issue'),
      allowNull: false
    },
    date: {
      type: Sequelize.DataTypes.DATE,
      default: Sequelize.DataTypes.Now
    },
    receipt: {
      type: Sequelize.STRING
    }
  })
  StockAccountMovement.associate = function ({
    product,
    stockAccount,
    stockMovementType
  }) {
    StockAccountMovement.hasMany(product, { as: 'products' })
    StockAccountMovement.belongsTo(stockAccount)
    StockAccountMovement.belongsTo(stockMovementType)
  }
  return StockAccountMovement
}
