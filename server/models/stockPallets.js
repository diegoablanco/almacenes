const Sequelize = require('sequelize')

module.exports = function (sequelize) {
  const StockPallets = sequelize.define('stockPallets', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    unitsPerPallet: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    totalUnits: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    individualWeight: {
      type: Sequelize.DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    totalWeight: {
      type: Sequelize.DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    }
  })
  StockPallets.associate = function ({ stockItemDetail }) {
    StockPallets.belongsToMany(stockItemDetail, { as: 'details', through: 'stockPallets_details' })
  }
  return StockPallets
}
