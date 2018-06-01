const Sequelize = require('sequelize')

module.exports = function (sequelize) {
  const StockAccountIssue = sequelize.define('stockAccountIssue', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    date: {
      type: Sequelize.DataTypes.DATE,
      default: Sequelize.DataTypes.Now
    },
    receipt: {
      type: Sequelize.STRING,
      allowNull: false
    }
  })
  StockAccountIssue.associate = function ({
    product,
    stockAccount
  }) {
    StockAccountIssue.hasMany(product, { as: 'products' })
    StockAccountIssue.belongsTo(stockAccount)
  }
  return StockAccountIssue
}
