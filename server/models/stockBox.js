const Sequelize = require('sequelize')

module.exports = function (sequelize) {
  const StockBox = sequelize.define('stockBox', {
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
    opened: {
      type: Sequelize.BOOLEAN
    },
    originalSeals: {
      type: Sequelize.BOOLEAN
    },
    resealed: {
      type: Sequelize.BOOLEAN
    },
    serialNumbers: {
      type: Sequelize.BOOLEAN
    },
    shrinkWapped: {
      type: Sequelize.STRING
    },
    individualWeight: {
      type: Sequelize.DataTypes.DECIMAL(10, 2)
    },
    totalWeight: {
      type: Sequelize.DataTypes.DECIMAL(10, 2)
    }
  })
  StockBox.associate = function ({ stockItemDetail }) {
    StockBox.belongsToMany(stockItemDetail, { as: 'details', through: 'stockBox_details' })
  }
  return StockBox
}
