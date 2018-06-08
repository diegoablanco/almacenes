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
    stockAccountMovement
  }) {
    StockAccount.hasMany(product, { as: 'products' })
    StockAccount.hasMany(stockAccountMovement, { as: 'receives', scope: { type: 'receive' } })
    StockAccount.hasMany(stockAccountMovement, { as: 'issues', scope: { type: 'issue' } })
  }
  return StockAccount
}
