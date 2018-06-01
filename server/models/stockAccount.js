const Sequelize = require('sequelize')

module.exports = function (sequelize) {
  const StockAccount = sequelize.define('stockAccount', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    }
  })
  StockAccount.associate = function ({
    product,
    stockAccountReceive,
    stockAccountIssue
  }) {
    StockAccount.hasMany(product, { as: 'products' })
    StockAccount.hasMany(stockAccountReceive, { as: 'receives' })
    StockAccount.hasMany(stockAccountIssue, { as: 'issues' })
  }
  return StockAccount
}
