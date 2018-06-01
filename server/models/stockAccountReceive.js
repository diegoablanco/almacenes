const Sequelize = require('sequelize')

module.exports = function (sequelize) {
  const StockAccountReceive = sequelize.define('stockAccountReceive', {
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
  StockAccountReceive.associate = function ({
    product,
    stockAccount
  }) {
    StockAccountReceive.hasMany(product, { as: 'products' })
    StockAccountReceive.belongsTo(stockAccount)
  }
  return StockAccountReceive
}
